document.addEventListener("DOMContentLoaded", () => {
    const quickEnquiry = document.getElementById("quick-enquiry");
    const modal = document.getElementById("inquiry-modal");

    quickEnquiry.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });
});