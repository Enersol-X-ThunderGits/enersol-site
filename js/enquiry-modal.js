
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("inquiry-modal");
    const closeButton = document.getElementById("close-modal");
    const courseDropdown = document.getElementById("course");
    const offerPopup = document.getElementById("offer-popup");
    const closeOffer = document.getElementById("close-offer");
    const claimOffer = document.getElementById("claim-offer");

    let enquiryClosed = false;
    let scrolled = false;


    // Show modal on load
    modal.classList.remove("hidden");

    // Close Enquiry Modal
    closeButton.addEventListener("click", () => {
        modal.classList.add("hidden");
        enquiryClosed = true;
    });

    // Show Offer Popup After 1 Second of Scrolling (only if enquiry was closed)
    window.addEventListener("scroll", () => {
        if (enquiryClosed && !scrolled) {
            scrolled = true;
            setTimeout(() => {
                offerPopup.classList.remove("hidden");
            }, 1000); // 1 second delay
        }
    });

    // Close Offer Popup
    closeOffer.addEventListener("click", () => {
        offerPopup.classList.add("hidden");
    });

    // Claim Offer - Redirect to WhatsApp
    // claimOffer.addEventListener("click", () => {
    //     const whatsappMessage = `Hello Team! I am interested in B.Ed admission at ₹80,000/- for both years. Please guide me with the admission process.`;
    //     const whatsappNumber = "919414535665";
    //     const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    //     window.open(whatsappLink, "_blank");
    // });

    // Handle form submission
    const form = document.getElementById("inquiry-form");
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    const showToast = (message, isSuccess = true) => {
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.className = `fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-${isSuccess ? "green" : "red"}-600 text-white px-4 py-2 rounded shadow z-50 text-sm`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    function showModal(title, bodyHtml) {
        const modal = document.createElement("div");
        modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
        modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg max-w-md text-center shadow-lg animate-fadeIn">
      <h3 class="text-xl font-semibold text-green-600 mb-2">${title}</h3>
      <p class="text-gray-700 mb-4">${bodyHtml}</p>
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none close-modal">Close</button>
    </div>
  `;

        document.body.appendChild(modal);
        modal.querySelector(".close-modal").addEventListener("click", () => modal.remove());
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Submitting...";

        const name = document.getElementById("name").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const email = document.getElementById("email").value.trim();
        const selectedCourse = document.getElementById("course").value;


        // Prepare HTML email
        const htmlContent = `
      <div style="max-width:600px;margin:0 auto;font-family:'Segoe UI',Roboto,sans-serif;color:#333;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        <div style="background:#15803d;padding:16px;text-align:center;">
          <h2 style="color:#fff;margin:0;">New Contact Form Submission</h2>
        </div>
        <div style="padding:24px;background-color:#ffffff;">
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Interested Product:</strong> ${selectedCourse}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 20px;">
          <p style="font-size:13px;color:#6b7280;text-align:center;">
            This message was submitted via the contact form on <strong>enersolbiopower.com</strong>.
          </p>
        </div>
        <div style="background:#f9fafb;padding:12px;text-align:center;font-size:12px;color:#9ca3af;">
          &copy; ${new Date().getFullYear()} Enersol Biopower Pvt. Ltd. | www.enersolbiopower.com
        </div>
      </div>
    `;

        const emailData = {
            to: "info@enersolbiopower.com",
            subject: "Enersol Inquiry Form Submission",
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
                showModal("Submitted successfully", "Thank you for contacting <strong>Enersol Biopower</strong>! Our team will get back to you shortly via email.");
                form.reset();
                modal.classList.add("hidden");
            } else {
                showToast("Failed to send email. Please try again.", false);
            }
        } catch (error) {
            showToast("An error occurred. Please try again later.", false);
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    });

    // Close modal on button click
    document.getElementById("close-modal").addEventListener("click", () => {
        modal.classList.add("hidden");
    });
});