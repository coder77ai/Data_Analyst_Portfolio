// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Huly.io-style Interactive Tab Effects
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section-content');
const dashboardBg = document.getElementById('dashboardBg');

// Function to activate section and dashboard background
function activateSection(sectionId) {
    // Remove active class from all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Add active class to current section
    const currentSection = document.getElementById(sectionId);
    if (currentSection) {
        currentSection.classList.add('active');
    }
    
    // Animate dashboard background
    if (dashboardBg) {
        dashboardBg.classList.add('active');
        setTimeout(() => {
            dashboardBg.classList.remove('active');
        }, 1000);
    }
    
    // Animate charts
    animateCharts();
}

// Function to animate charts when section changes
function animateCharts() {
    const bars = document.querySelectorAll('.bar');
    const charts = document.querySelectorAll('.chart-box');
    
    bars.forEach((bar, index) => {
        bar.style.animation = 'none';
        setTimeout(() => {
            bar.style.animation = 'barGrow 1s ease';
        }, index * 100);
    });
    
    charts.forEach((chart, index) => {
        chart.style.transform = 'scale(0.95)';
        setTimeout(() => {
            chart.style.transform = 'scale(1)';
            chart.style.transition = 'transform 0.3s ease';
        }, index * 50);
    });
}

// Add click event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const sectionId = this.getAttribute('data-section') || this.getAttribute('href').substring(1);
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Activate section with animation
        setTimeout(() => {
            activateSection(sectionId);
        }, 100);
    });
});

// Intersection Observer for active navigation highlighting
const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            
            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}` || 
                    link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
            
            // Activate section
            activateSection(sectionId);
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// Animate Skill Bars on Scroll
const skillObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress) {
                const width = skillProgress.getAttribute('data-width');
                skillProgress.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        }
    });
}, skillObserverOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// Animate Elements on Scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Apply animation to sections
document.querySelectorAll('.about-content, .skills-grid, .projects-grid, .contact-content').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(section);
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Initialize dashboard animations on page load
window.addEventListener('load', () => {
    animateCharts();
    
    // Set initial active section
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
    }
});

// Add parallax effect to dashboard background on scroll
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (dashboardBg) {
        const parallaxSpeed = 0.5;
        dashboardBg.style.transform = `translateY(${currentScrollY * parallaxSpeed}px)`;
    }
    
    lastScrollY = currentScrollY;
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);
