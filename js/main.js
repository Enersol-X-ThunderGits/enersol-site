const testimonialSwiper = new Swiper('.testimonialSwiper', {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,  // Display 2 testimonials per slide
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

var swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: {
        delay: 2500,
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
});

var productSwiper = new Swiper('.productSwiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,  // Optional: adds looping
    autoplay: {
        delay: 2500, // Delay in milliseconds before switching slides
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
        640: {
            slidesPerView: 1,
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
