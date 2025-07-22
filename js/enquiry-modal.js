
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
    document.getElementById("inquiry-form").addEventListener("submit", (e) => {
        console.log("Form submitted");
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const mobile = document.getElementById("mobile").value;
        const email = document.getElementById("email").value;
        const selectedCourse = document.getElementById("course").value;

        // Create WhatsApp message
        const whatsappMessage = `Hello Team! I am ${name}. My mobile number is ${mobile} and my email is ${email}. I am interested in the course: ${selectedCourse}`;

        const whatsappNumber = "919414535665";

        // WhatsApp link
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
        )}`;

        // Open WhatsApp
        window.open(whatsappLink, "_blank");

        // Close the modal
        modal.classList.add("hidden");
        enquiryClosed = true;
    });
});