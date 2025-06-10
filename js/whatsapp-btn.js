document.addEventListener("DOMContentLoaded", () => {
    const whatsAppBtn = document.getElementById("whatsApp-floating-btn");


    whatsAppBtn.addEventListener("click", () => {
        const whatsappNumber = "919414535665"; // Replace with your WhatsApp number
        const text = `Hello Team! I would like to get in touch with you.`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

        // Open WhatsApp with pre-filled message
        window.open(whatsappUrl, "_blank");
    });
});