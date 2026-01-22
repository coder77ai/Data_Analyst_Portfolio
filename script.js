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
    
    // Section activation complete
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

// Initialize on page load
window.addEventListener('load', () => {
    // Set initial active section
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
    }
    
    // Initialize tech stacks positions
    initializeTechStacks();
});

// Tech Stacks Interactive Effect (like huly.io)
const techStacksContainer = document.getElementById('techStacks');
const techStackItems = document.querySelectorAll('.tech-stack-item');

function initializeTechStacks() {
    // Randomly position tech stack items
    techStackItems.forEach((item, index) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        item.style.left = `${x}%`;
        item.style.top = `${y}%`;
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Mouse/Touch movement tracking
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateTechStacks();
});

document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        updateTechStacks();
    }
});

function updateTechStacks() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    techStackItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemX = rect.left + rect.width / 2;
        const itemY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse/touch to tech stack item
        const distance = Math.sqrt(
            Math.pow(mouseX - itemX, 2) + Math.pow(mouseY - itemY, 2)
        );
        
        // Calculate max distance (diagonal of screen)
        const maxDistance = Math.sqrt(
            Math.pow(windowWidth, 2) + Math.pow(windowHeight, 2)
        );
        
        // Normalize distance (0 to 1)
        const normalizedDistance = Math.min(distance / (maxDistance * 0.5), 1);
        
        // Inverse relationship: closer = more visible
        const proximity = 1 - normalizedDistance;
        
        if (proximity > 0.3) {
            item.classList.add('active');
            if (proximity > 0.6) {
                item.classList.add('strong');
            } else {
                item.classList.remove('strong');
            }
        } else {
            item.classList.remove('active', 'strong');
        }
        
        // Add subtle movement based on mouse position
        const moveX = (mouseX - itemX) * 0.01;
        const moveY = (mouseY - itemY) * 0.01;
        item.style.transform = `translate(${moveX}px, ${moveY}px) scale(${0.8 + proximity * 0.3})`;
    });
}

// Add hover effect on sections
const sections = document.querySelectorAll('.section-content');
sections.forEach(section => {
    section.addEventListener('mouseenter', () => {
        // Show nearby tech stacks more prominently
        techStackItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
            
            if (rect.top < sectionRect.bottom && rect.bottom > sectionRect.top &&
                rect.left < sectionRect.right && rect.right > sectionRect.left) {
                item.classList.add('active');
            }
        });
    });
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
