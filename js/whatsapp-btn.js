document.addEventListener("DOMContentLoaded", () => {
    const whatsAppBtn = document.getElementById("whatsApp-floating-btn");


    whatsAppBtn.addEventListener("click", () => {
        const whatsappNumber = "919414535665"; // Replace with your WhatsApp number
        const text = `Hello Team! I visited ${document.title} and would like to get in touch with you.`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        const pageRef = encodeURIComponent(window.location.pathname);

        try {
            window.dataLayer = window.dataLayer || [];
            if (typeof window.gtag !== "function") {
                window.gtag = function () { window.dataLayer.push(arguments); };
            }
            window.gtag('event', 'conversion', { 'send_to': 'AW-18007502019/JOv4CJSf0qkcEMPZ0opD' });
            window.gtag('event', 'whatsapp_click', { 'event_category': 'engagement', 'event_label': document.title, 'page_path': window.location.pathname });
        } catch (e) { }

        // Open WhatsApp with pre-filled message
        window.open(whatsappUrl, "_blank");
    });
});
