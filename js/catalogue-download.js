function openCatalogueModal(downloadUrl, productName) {
    // Create modal container
    const modalId = "catalogue-download-modal";
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement("div");
        modal.id = modalId;
        modal.className = "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4";
        modal.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
                <div class="bg-primary-dark p-4 flex justify-between items-center text-white">
                    <h3 class="text-lg font-semibold">Download Product Catalogue</h3>
                    <button id="close-catalogue-modal" class="text-white hover:text-gray-200 focus:outline-none">
                        <i class="ri-close-line text-2xl"></i>
                    </button>
                </div>
                <div class="p-6">
                    <p class="text-gray-600 mb-6 text-sm">Please provide your details to download the catalogue for <strong>${productName}</strong>.</p>
                    <form id="catalogue-download-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input type="text" id="cat-name" required class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all" placeholder="John Doe">
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                <input type="tel" id="cat-phone" required class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all" placeholder="+91 XXXX XXXX">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                <input type="email" id="cat-email" required class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all" placeholder="john@example.com">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                            <textarea id="cat-address" required rows="2" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all" placeholder="Your City, State, Country"></textarea>
                        </div>
                        <button type="submit" id="cat-submit-btn" class="w-full bg-primary-dark hover:bg-primary text-white font-semibold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
                            <span>Download Now</span>
                            <i class="ri-download-2-line"></i>
                        </button>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close logic
        document.getElementById("close-catalogue-modal").addEventListener("click", () => {
            modal.classList.add("hidden");
        });

        // Form submission
        const form = document.getElementById("catalogue-download-form");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById("cat-submit-btn");
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
            `;

            const name = document.getElementById("cat-name").value.trim();
            const phone = document.getElementById("cat-phone").value.trim();
            const email = document.getElementById("cat-email").value.trim();
            const address = document.getElementById("cat-address").value.trim();

            // Email template
            const htmlContent = `
                <div style="max-width:600px;margin:0 auto;font-family:'Segoe UI',Roboto,sans-serif;color:#333;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                    <div style="background:#03459b;padding:16px;text-align:center;">
                        <h2 style="color:#fff;margin:0;">Catalogue Download Lead</h2>
                    </div>
                    <div style="padding:24px;background-color:#ffffff;">
                        <p style="margin-top:0;">Hello Admin,</p>
                        <p>A new customer has shared their details to download the product catalogue.</p>
                        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
                        <p><strong>Product:</strong> ${productName}</p>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Address:</strong> ${address}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                        <hr style="border:none;border-top:1px solid #eee;margin:20px 20px;">
                        <p style="font-size:13px;color:#6b7280;text-align:center;">
                            This lead was generated via the catalogue download form on <strong>enersolbiopower.com</strong>.
                        </p>
                    </div>
                    <div style="background:#f9fafb;padding:12px;text-align:center;font-size:12px;color:#9ca3af;">
                        &copy; ${new Date().getFullYear()} Enersol Biopower Pvt. Ltd.
                    </div>
                </div>
            `;

            const emailData = {
                to: "info@enersolbiopower.com",
                subject: `Catalogue Download Lead - ${productName}`,
                siteKey: "enersol",
                html: htmlContent
            };

            try {
                const response = await fetch("https://tg-email-service.thundergits.com/api/email/send", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(emailData)
                });

                if (response.ok) {
                    // Trigger download
                    const link = document.createElement("a");
                    link.href = downloadUrl;
                    link.target = "_blank";
                    link.download = "";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // Success message
                    submitBtn.classList.remove("bg-primary-dark");
                    submitBtn.classList.add("bg-green-600");
                    submitBtn.innerHTML = `<span>Downloaded Successfully!</span> <i class="ri-check-line"></i>`;
                    
                    setTimeout(() => {
                        modal.classList.add("hidden");
                        form.reset();
                        submitBtn.classList.remove("bg-green-600");
                        submitBtn.classList.add("bg-primary-dark");
                        submitBtn.innerHTML = originalContent;
                        submitBtn.disabled = false;
                    }, 2000);
                } else {
                    alert("Failed to process your request. Please try again.");
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalContent;
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please check your connection and try again.");
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
            }
        });
    } else {
        // Just update product name and show
        modal.classList.remove("hidden");
        // Update product name in text if needed
        const productNameElement = modal.querySelector("strong");
        if (productNameElement) productNameElement.textContent = productName;
        
        // Re-bind the form submission to have the correct product name and download URL
        const form = document.getElementById("catalogue-download-form");
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        // Use a wrapper function to re-add the event listener with current closure variables
        // Actually, a better way is to attach a click listener that stores these in data attributes
        modal.dataset.downloadUrl = downloadUrl;
        modal.dataset.productName = productName;
        
        // Re-setup form listener logic (simplified)
        // For simplicity, let's just re-create the modal every time for now or update it properly
        // For performance, re-creating is fine here since it's only on button click
        modal.remove();
        openCatalogueModal(downloadUrl, productName);
    }
}
