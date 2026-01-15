// ============================================
// INTERACTIVE TIMELINE (ABOUT PAGE)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const timelinePoints = document.querySelectorAll('.timeline-point');
    const experienceItems = document.querySelectorAll('.timeline-item.detailed');
    
    // Calculate timeline positions and sizes
    const timelineContainer = document.querySelector('.interactive-timeline');
    const timelineSegments = document.querySelectorAll('.timeline-segment');
    
    // Timeline spans from 2017-01 to 2026-02 (122 months)
    const totalMonths = 122;
    
    // Position and size segments based on duration
    timelineSegments.forEach(segment => {
        const startMonth = parseInt(segment.getAttribute('data-start-month')) || 0;
        const endMonth = parseInt(segment.getAttribute('data-end-month')) || totalMonths;
        const duration = endMonth - startMonth;
        
        // Calculate position and width as percentage
        const leftPercent = (startMonth / totalMonths) * 100;
        const widthPercent = (duration / totalMonths) * 100;
        
        // Set position and width
        segment.style.left = `${leftPercent}%`;
        segment.style.width = `${widthPercent}%`;
        
        // Position segment line
        const segmentLine = segment.querySelector('.timeline-segment-line');
        if (segmentLine) {
            segmentLine.style.left = '0';
            segmentLine.style.right = '0';
        }
        
        // Center the point
        const point = segment.querySelector('.timeline-point');
        if (point) {
            point.style.left = '50%';
            if (segment.classList.contains('professional')) {
                point.style.transform = 'translateX(-50%) translateY(-50%)';
            } else if (segment.classList.contains('parallel')) {
                point.style.transform = 'translateX(-50%) translateY(50%)';
            }
        }
    });
    
    // Add graduation bars (every 6 months = every semester)
    const graduationsContainer = document.querySelector('.timeline-graduations');
    if (graduationsContainer) {
        // Year months: 0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120 (2017 to 2026)
        const yearMonths = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120];
        
        for (let month = 0; month <= totalMonths; month += 6) {
            const percent = (month / totalMonths) * 100;
            const bar = document.createElement('div');
            // Add 'major' class for year graduations, 'minor' for semester graduations
            const isYear = yearMonths.includes(month);
            bar.className = isYear ? 'timeline-graduation-bar timeline-graduation-major' : 'timeline-graduation-bar timeline-graduation-minor';
            bar.style.left = `${percent}%`;
            graduationsContainer.appendChild(bar);
        }
    }
    
    // Add time markers on main timeline (every year: 2021, 2022, 2023, 2024, 2025)
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine && timelineLine.parentElement) {
        const timeMarkersContainer = document.createElement('div');
        timeMarkersContainer.className = 'timeline-time-markers';
        timelineLine.parentElement.appendChild(timeMarkersContainer);
        
        // Timeline starts at 2017-01 (month 0) and ends at 2026-02 (month 121)
        // Years: 2017 (month 0), 2018 (month 12), 2019 (month 24), 2020 (month 36), 2021 (month 48), 2022 (month 60), 2023 (month 72), 2024 (month 84), 2025 (month 96), 2026 (month 108)
        const yearMonths = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108]; // 2017 to 2026 start
        const yearLabels = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];
        
        yearMonths.forEach((month, index) => {
            const percent = (month / totalMonths) * 100;
            const marker = document.createElement('div');
            marker.className = 'timeline-time-marker';
            marker.style.left = `${percent}%`;
            
            // Create label outside of marker to avoid opacity inheritance
            const label = document.createElement('div');
            label.className = 'timeline-time-marker-label';
            label.textContent = yearLabels[index];
            label.style.left = `${percent}%`;
            
            timeMarkersContainer.appendChild(marker);
            timeMarkersContainer.appendChild(label);
        });
    }
    
    
    if (timelineSegments.length > 0) {
        timelineSegments.forEach(segment => {
            const expId = segment.getAttribute('data-exp-id');
            
            if (!expId) return;
            
            // Click event - show only the clicked experience
            segment.addEventListener('click', () => {
                // Remove active class from all segments and experiences
                timelineSegments.forEach(s => s.classList.remove('active'));
                experienceItems.forEach(exp => exp.classList.remove('active'));
                
                // Add active class to clicked segment
                segment.classList.add('active');
                
                // Show only the corresponding experience
                const targetExp = document.getElementById(expId);
                if (targetExp) {
                    targetExp.classList.add('active');
                    
                    // Scroll to the experience
                    setTimeout(() => {
                        targetExp.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 100);
                }
            });
            
            // Mouse enter - show tooltip (already handled by CSS)
            // Mouse leave - ensure preview stays if segment is active
            segment.addEventListener('mouseleave', () => {
                if (!segment.classList.contains('active')) {
                    // Tooltip will hide automatically via CSS
                }
            });
        });
        
        // Don't reset when clicking outside - keep experience visible
        // Experience only changes when clicking on another timeline segment
        
        // Show first experience by default (most recent professional)
        const professionalSegments = Array.from(timelineSegments).filter(s => s.classList.contains('professional'));
        if (professionalSegments.length > 0) {
            const firstSegment = professionalSegments[professionalSegments.length - 1]; // Last professional segment
            const firstExpId = firstSegment.getAttribute('data-exp-id');
            if (firstExpId) {
                const firstExp = document.getElementById(firstExpId);
                if (firstExp) {
                    firstSegment.classList.add('active');
                    firstExp.classList.add('active');
                }
            }
        }
    }
});

