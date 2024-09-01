document.addEventListener('DOMContentLoaded', function () {
    // Particle Background Animation
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('Particles.js config loaded');
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

    setInterval(nextTestimonial, 5000);
});
