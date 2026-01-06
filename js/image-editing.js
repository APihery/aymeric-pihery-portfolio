// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.image-skill-card, .tool-card, .external-link-card, .intro-text, .intro-actions');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // BEFORE/AFTER SLIDER
    // ============================================
    
    const comparisonContainers = document.querySelectorAll('.comparison-container');
    
    comparisonContainers.forEach(container => {
        const beforeImage = container.querySelector('.comparison-image-before');
        const slider = container.querySelector('.comparison-slider');
        let isDragging = false;
        
        // Initialize position at 50%
        let position = 50;
        updateSlider(position, container, beforeImage, slider);
        
        // Mouse move handler - follows mouse when hovering
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            position = percentage;
            updateSlider(position, container, beforeImage, slider);
        };
        
        // Mouse down handler
        const handleMouseDown = (e) => {
            isDragging = true;
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            position = percentage;
            updateSlider(position, container, beforeImage, slider);
            
            e.preventDefault();
        };
        
        // Mouse up handler
        const handleMouseUp = () => {
            isDragging = false;
        };
        
        // Mouse enter handler - follow mouse movement
        const handleMouseEnter = () => {
            container.addEventListener('mousemove', handleMouseMove);
        };
        
        // Mouse leave handler
        const handleMouseLeave = () => {
            container.removeEventListener('mousemove', handleMouseMove);
            isDragging = false;
        };
        
        // Attach event listeners
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseup', handleMouseUp);
        
        // Touch support for mobile
        let touchStartX = 0;
        let touchPosition = 50;
        
        const handleTouchMove = (e) => {
            e.preventDefault();
            const rect = container.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            touchPosition = percentage;
            updateSlider(touchPosition, container, beforeImage, slider);
        };
        
        container.addEventListener('touchstart', (e) => {
            const rect = container.getBoundingClientRect();
            const touch = e.touches[0];
            touchStartX = touch.clientX - rect.left;
            container.addEventListener('touchmove', handleTouchMove);
        });
        
        container.addEventListener('touchend', () => {
            container.removeEventListener('touchmove', handleTouchMove);
        });
    });
    
    function updateSlider(position, container, beforeImage, slider) {
        // Update clip-path to reveal "after" image from left to right
        // Position 0% = show only "before" (right, avant)
        // Position 50% = show half "before" and half "after"
        // Position 100% = show only "after" (left, après)
        // Clip the "before" image from the left, showing it from position% to 100%
        beforeImage.style.clipPath = `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`;
        
        // Move slider to position
        slider.style.left = `${position}%`;
    }
});

