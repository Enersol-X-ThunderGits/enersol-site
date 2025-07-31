// ✅ Auto-inject style tag for toast + modal animations
(function injectCSS() {
    const style = document.createElement("style");
    style.innerHTML = `
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateY(-10px); }
      20% { opacity: 1; transform: translateY(0); }
      80% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-10px); }
    }

    .animate-fadeInOut {
      animation: fadeInOut 3s ease forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `;
    document.head.appendChild(style);
})();

// ✅ Form submit logic
const form = document.getElementById("contactForm");
const submitBtn = form.querySelector('button[type="submit"]');
let originalBtnText = submitBtn.innerHTML;

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    const name = form.querySelector('input[name="name"]').value.trim();
    const mobile = form.querySelector('input[name="mobile"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

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
        <p><strong>Message:</strong><br/> ${message.replace(/\n/g, '<br/>')}</p>
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
            showModal("Thank You!", `
        Thank you for contacting <strong>Enersol Biopower</strong> — our team will get back to you shortly via email.
        <br>
        You can also reach us directly at <strong>+91 9414535665</strong>.
      `);
            form.reset();
        } else {
            showToast("Failed to send message. Please try again.");
        }
    } catch (error) {
        showToast("An error occurred. Please try again later.");
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
});

// ✅ Toast generator
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "fixed top-6 right-6 bg-red-500 text-white px-4 py-3 rounded-md shadow-lg z-[60] animate-fadeInOut";
    toast.innerHTML = `<span>${message}</span>`;

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ✅ Modal generator
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
