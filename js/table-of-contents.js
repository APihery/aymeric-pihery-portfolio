// ============================================
// INTERACTIVE TABLE OF CONTENTS - VERTICAL FIXED
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const tocSection = document.querySelector('.table-of-contents-section');
    if (!tocSection) return;

    // Add class to body to enable content margin
    document.body.classList.add('has-toc');

    const tocSegments = document.querySelectorAll('.toc-segment');
    
    if (tocSegments.length === 0) return;

    // Handle clicks on segments - scroll to target section
    tocSegments.forEach(segment => {
        const targetId = segment.getAttribute('data-target');
        const targetElement = targetId ? document.getElementById(targetId) : null;
        
        if (!targetElement) return;

        segment.addEventListener('click', (e) => {
            // Don't trigger if clicking on a sublabel
            if (e.target.closest('.toc-sublabel')) return;
            
            // Remove active class from all segments and sublabels
            tocSegments.forEach(s => {
                s.classList.remove('active');
                s.querySelectorAll('.toc-sublabel').forEach(sub => sub.classList.remove('active'));
            });
            
            // Add active class to clicked segment
            segment.classList.add('active');
            
            // Scroll to target section
            const headerOffset = 100; // Offset for fixed navbar and sidebar
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close sidebar on mobile after click
            if (window.innerWidth <= 1024) {
                setTimeout(() => {
                    tocSection.classList.remove('open');
                }, 300);
            }
        });

        // Handle subsection clicks if present
        const subsectionElements = segment.querySelectorAll('.toc-sublabel[data-subsection-target]');
        subsectionElements.forEach(subElement => {
            const subTargetId = subElement.getAttribute('data-subsection-target');
            const subTargetElement = subTargetId ? document.getElementById(subTargetId) : null;
            
            if (!subTargetElement) return;

            subElement.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent parent segment click
                
                // Remove active class from all segments and sublabels
                tocSegments.forEach(s => {
                    s.classList.remove('active');
                    s.querySelectorAll('.toc-sublabel').forEach(sub => sub.classList.remove('active'));
                });
                
                // Add active class to parent segment and this sublabel
                segment.classList.add('active');
                subElement.classList.add('active');
                
                // Scroll to subsection
                const headerOffset = 100; // Offset for fixed navbar and sidebar
                const elementPosition = subTargetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close sidebar on mobile after click
                if (window.innerWidth <= 1024) {
                    setTimeout(() => {
                        tocSection.classList.remove('open');
                    }, 300);
                }
            });
        });
    });

    // Update active segment based on scroll position (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '-25% 0px -65% 0px', // Section is active when it's in the upper 35% of viewport
        threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (!sectionId) return;

                // Remove active class from all segments
                tocSegments.forEach(s => s.classList.remove('active'));
                
                // Find and activate the corresponding segment
                const correspondingSegment = Array.from(tocSegments).find(seg => {
                    const targetId = seg.getAttribute('data-target');
                    return targetId === sectionId;
                });

                // Also check for subsections
                if (!correspondingSegment) {
                    tocSegments.forEach(seg => {
                        const subsections = seg.querySelectorAll('.toc-sublabel[data-subsection-target]');
                        subsections.forEach(sub => {
                            const subTargetId = sub.getAttribute('data-subsection-target');
                            if (subTargetId === sectionId) {
                                seg.classList.add('active');
                                sub.classList.add('active');
                            } else {
                                sub.classList.remove('active');
                            }
                        });
                    });
                } else {
                    correspondingSegment.classList.add('active');
                    // Remove active from subsections of other segments
                    tocSegments.forEach(seg => {
                        if (seg !== correspondingSegment) {
                            seg.querySelectorAll('.toc-sublabel').forEach(sub => sub.classList.remove('active'));
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all target sections
    tocSegments.forEach(segment => {
        const targetId = segment.getAttribute('data-target');
        const targetElement = targetId ? document.getElementById(targetId) : null;
        
        if (targetElement) {
            observer.observe(targetElement);
        }

        // Also observe subsections
        const subsectionElements = segment.querySelectorAll('.toc-sublabel[data-subsection-target]');
        subsectionElements.forEach(subElement => {
            const subTargetId = subElement.getAttribute('data-subsection-target');
            const subTargetElement = subTargetId ? document.getElementById(subTargetId) : null;
            
            if (subTargetElement) {
                observer.observe(subTargetElement);
            }
        });
    });

    // Mobile toggle button
    const tocToggleButton = document.createElement('button');
    tocToggleButton.className = 'toc-toggle-button';
    tocToggleButton.setAttribute('aria-label', 'Ouvrir/Fermer le sommaire');
    tocToggleButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
    `;
    document.body.appendChild(tocToggleButton);

    // Toggle sidebar on mobile
    tocToggleButton.addEventListener('click', () => {
        tocSection.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (tocSection.classList.contains('open') && 
                !tocSection.contains(e.target) && 
                !tocToggleButton.contains(e.target)) {
                tocSection.classList.remove('open');
            }
        }
    });
});
