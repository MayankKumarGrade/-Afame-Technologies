document.addEventListener('DOMContentLoaded', function () {

    AOS.init({
        duration: 1200,
    });

    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded.');
    });

    const testimonials = document.querySelectorAll('.testimonial');
    let index = 0;

    function showTestimonial(i) {
        testimonials.forEach((testimonial, idx) => {
            testimonial.classList.remove('active');
            if (idx === i) testimonial.classList.add('active');
        });
    }

    function nextTestimonial() {
        index = (index + 1) % testimonials.length;
        showTestimonial(index);
    }

    function prevTestimonial() {
        index = (index - 1 + testimonials.length) % testimonials.length;
        showTestimonial(index);
    }

    setInterval(nextTestimonial, 5000);

    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    if (prevButton && nextButton) {
        nextButton.addEventListener('click', nextTestimonial);
        prevButton.addEventListener('click', prevTestimonial);
    }

    const form = document.getElementById('contact-form');
    const modal = document.getElementById('custom-alert');
    const closeBtn = document.querySelector('.close-btn');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            modal.style.display = 'block';
            form.reset();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
