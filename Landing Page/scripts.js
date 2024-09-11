document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1200,
    });

    // Particle Background Animation
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded.');
    });

    // Testimonials Slider
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

    // Automatically change testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);

    // Attach event listeners for manual navigation
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
            event.preventDefault(); // Prevent the default form submission
            modal.style.display = 'block'; // Show the custom alert
            form.reset();
        });
    }

    // Close the modal when the user clicks on the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none'; // Hide the custom alert
        });
    }

    // Close the modal when the user clicks anywhere outside of the modal
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none'; // Hide the custom alert
        }
    });
});
