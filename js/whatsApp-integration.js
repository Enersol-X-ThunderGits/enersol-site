function sendToWhatsApp() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const number = document.getElementById("number").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!email || !number || !message) {
    alert("Please fill out all the fields.");
    return;
  }

  const whatsappNumber = "919414535665"; // Replace with your WhatsApp number
  const text = `Hello Team!, I am ${name}, my email is ${email}, my contact number is ${number}, and my message is: ${message}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  try {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
      window.gtag = function () { window.dataLayer.push(arguments); };
    }
    window.gtag('event', 'conversion', { 'send_to': 'AW-18007502019/JOv4CJSf0qkcEMPZ0opD' });
  } catch (e) { }

  // Open WhatsApp with pre-filled message
  window.open(whatsappUrl, "_blank");
}
