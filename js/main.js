const testimonialSwiper = new Swiper('.testimonials', {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
    breakpoints: {
        768: {
            slidesPerView: 2,
        }
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

var swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    effect: 'coverflow',  // Optional effect
    // on: {
    //     slideChangeTransitionEnd: function () {
    //         // Reset all slides
    //         this.slides.forEach(slide => {
    //             slide.style.transform = 'scale(1)';
    //             slide.style.zIndex = '1';
    //         });

    //         // Scale the active slide
    //         const activeSlide = this.slides[this.activeIndex];
    //         activeSlide.style.transform = 'scale(1.2)';
    //         activeSlide.style.zIndex = '2';
    //     }
    // }
});

var productSwiper = new Swiper('.productSwiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,  // Optional: adds looping
    autoplay: {
        delay: 5000, // Delay in milliseconds before switching slides
        disableOnInteraction: false, // Continue autoplay when interacting with controls
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        600: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

// Google Ads conversions (gtag) - implemented via existing Google tag loader on pages
(function () {
    const ADS_ID = "AW-18007502019";

    const LABELS = {
        phone_9414: "GWSiCJDXtakcEMPZ0opD",
        phone_8239: "u5hPCPO7zakcEMPZ0opD",
        email_click: "AAh7CJSZz6kcEMPZ0opD",
        whatsapp_click: "JOv4CJSf0qkcEMPZ0opD",
        contact_form: "D89dCJmw0qkcEMPZ0opD",
        home_view: "8h2kCPSauakcEMPZ0opD",
    };

    function ensureGtag() {
        window.dataLayer = window.dataLayer || [];
        if (typeof window.gtag !== "function") {
            window.gtag = function () { window.dataLayer.push(arguments); };
        }
    }

    function fireConversion(label) {
        try {
            ensureGtag();
            window.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}` });
        } catch (_) { }
    }

    // Base config for Google Ads (safe even if GA is already configured elsewhere)
    try {
        ensureGtag();
        window.gtag("config", ADS_ID);
    } catch (_) { }

    // Home page view conversion (only fire on / or /index.html)
    try {
        const path = (window.location && window.location.pathname) ? window.location.pathname.toLowerCase() : "";
        if (path === "/" || path.endsWith("/index.html")) {
            fireConversion(LABELS.home_view);
        }
    } catch (_) { }

    function digitsOnly(value) {
        return (value || "").toString().replace(/\D/g, "");
    }

    document.addEventListener("click", function (e) {
        const anchor = e.target && e.target.closest ? e.target.closest("a[href]") : null;
        if (!anchor) return;

        const href = anchor.getAttribute("href") || "";
        const hrefLower = href.toLowerCase();

        if (hrefLower.startsWith("tel:")) {
            const num = digitsOnly(hrefLower);
            if (num.includes("9414535665")) fireConversion(LABELS.phone_9414);
            else if (num.includes("8239554433")) fireConversion(LABELS.phone_8239);
            return;
        }

        if (hrefLower.startsWith("mailto:")) {
            fireConversion(LABELS.email_click);
            return;
        }

        if (hrefLower.includes("wa.me") || hrefLower.includes("api.whatsapp.com")) {
            fireConversion(LABELS.whatsapp_click);
        }
    }, true);
})();



// JavaScript to toggle the mobile menu
document.getElementById('mobile-menu-button').addEventListener('click', function () {
    var menu = document.getElementById('mobile-menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        menu.classList.add('transform', 'transition-all', 'duration-300', 'translate-x-0');
    } else {
        menu.style.display = 'none';
        menu.classList.remove('transform', 'transition-all', 'duration-300', 'translate-x-0');
    }
});

// Function to close the menu when clicking on close icon
function toggleMobileMenu() {
    document.getElementById('mobile-menu').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up-enter-active');
            } else {
                entry.target.classList.remove('fade-up-enter-active');
            }
        });
    }, {
        threshold: 0.5 // Adjust the threshold to when you want the animation to occur
    });

    // Query all elements you want to animate
    document.querySelectorAll('.fade-up-enter').forEach((el) => {
        observer.observe(el);
    });
});
