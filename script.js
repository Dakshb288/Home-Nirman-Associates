// Clean up the script by removing old code and keeping only what we need
document.addEventListener('DOMContentLoaded', () => {
    // Menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle menu function
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-content a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Add smooth scroll with offset for header
            const href = link.getAttribute('href');
            const offsetTop = document.querySelector(href).offsetTop;
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            window.scrollTo({
                top: offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
        });
    });

    // Initialize other animations and functionality
    revealSections();
    addSmoothStateChanges();

    // Add this to handle mobile navigation active states
    const sections = document.querySelectorAll('section[id]');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    // Update active nav item on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        mobileNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Handle mobile nav clicks
    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });

            // Update active state
            mobileNavItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
        });
    });
});

// Keep your existing animation and scroll functions below
const revealSections = () => {
    const sections = document.querySelectorAll('.services, .projects, .about, .contact');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
};

const addSmoothStateChanges = () => {
    const interactiveElements = document.querySelectorAll('.cta-button, .whatsapp-btn, .service-card, .project-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mousedown', () => {
            element.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('mouseup', () => {
            element.style.transform = '';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });
};

// WhatsApp functionality
const whatsappButton = document.getElementById('whatsappButton');
if (whatsappButton) {
    whatsappButton.addEventListener('click', (e) => {
        e.preventDefault();
        const phoneNumber = '919810068517';
        const message = 'Hi, I am interested in discussing a project with Home Nirman Associates.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}

// Smooth scroll function
const smoothScroll = (target) => {
    const element = document.querySelector(target);
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
};

// Enhanced scroll handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'));
    });
});

// Add this to your existing script.js
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
}); 