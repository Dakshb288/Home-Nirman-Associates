// Clean up the script by removing old code and keeping only what we need
document.addEventListener('DOMContentLoaded', () => {
    // Intro screen handling
    const introScreen = document.querySelector('.intro-screen');
    
    // Prevent scrolling while intro is showing
    document.body.style.overflow = 'hidden';
    
    // Remove intro screen after animation
    setTimeout(() => {
        introScreen.classList.add('fade-out');
        document.body.style.overflow = '';
        
        // Remove from DOM after fade out
        setTimeout(() => {
            introScreen.remove();
        }, 500);
    }, 2500);

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

    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Array of image paths (add your image paths here)
    const images = [
        'images/download (1).jpeg',
        'images/download (2).jpeg',
        'images/download.jpeg',
        'images/images.jpeg',
        'images/download (1).jpeg',
        'images/download (2).jpeg',
        'images/download.jpeg',
        'images/images.jpeg'
        // Add more image paths...
    ];

    // Initialize carousel
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    // Create carousel items
    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        if (index === 0) item.classList.add('active');
        
        const img = document.createElement('img');
        img.src = image;
        img.alt = `Project ${index + 1}`;
        
        item.appendChild(img);
        carouselTrack.appendChild(item);
    });

    // Handle touch/mouse events
    carouselTrack.addEventListener('mousedown', startDragging);
    carouselTrack.addEventListener('touchstart', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDragging);
    document.addEventListener('touchend', endDragging);

    function startDragging(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        carouselTrack.classList.add('swiping');
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const diff = currentX - startX;
        carouselTrack.style.transform = `translateX(${diff}px)`;
    }

    function endDragging() {
        if (!isDragging) return;
        isDragging = false;
        const diff = currentX - startX;
        
        if (Math.abs(diff) > 100) {
            if (diff > 0 && currentIndex > 0) {
                currentIndex--;
            } else if (diff < 0 && currentIndex < images.length - 1) {
                currentIndex++;
            }
        }
        
        updateCarousel();
        carouselTrack.classList.remove('swiping');
    }

    // Button controls
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    function updateCarousel() {
        const newTransform = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${newTransform}%)`;
        
        // Update active class
        document.querySelectorAll('.carousel-item').forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }

    // Auto-advance carousel
    setInterval(() => {
        if (!isDragging) {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        }
    }, 5000);

    // Add this after your carousel initialization
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const galleryPopup = document.getElementById('galleryPopup');
    const fullscreenView = document.getElementById('fullscreenView');
    const closePopup = document.querySelector('.close-popup');
    const closeFullscreen = document.querySelector('.close-fullscreen');
    const galleryGrid = document.querySelector('.gallery-grid');
    const fullscreenImg = document.querySelector('.fullscreen-view img');

    // Initialize gallery
    function initializeGallery() {
        // Clear existing items
        galleryGrid.innerHTML = '';
        
        // Add all images to gallery
        images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = image;
            img.alt = `Project ${index + 1}`;
            
            item.appendChild(img);
            galleryGrid.appendChild(item);
            
            // Add click event for fullscreen view
            item.addEventListener('click', () => {
                fullscreenImg.src = image;
                fullscreenView.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // View More button click
    viewMoreBtn.addEventListener('click', () => {
        galleryPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        initializeGallery();
    });

    // Close popup
    closePopup.addEventListener('click', () => {
        galleryPopup.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close fullscreen view
    closeFullscreen.addEventListener('click', () => {
        fullscreenView.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            galleryPopup.classList.remove('active');
            fullscreenView.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close fullscreen view when clicking outside the image
    fullscreenView.addEventListener('click', (e) => {
        if (e.target === fullscreenView) {
            fullscreenView.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Initialize number animation
    animateNumbers();
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

// Add this to your existing script.js
function animateNumbers() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.match(/[^0-9]/g)?.join('') || '';
        let current = 0;
        const increment = target / 50; // Adjust speed by changing divisor
        const duration = 1500; // Animation duration in milliseconds
        const stepTime = duration / 50;
        
        function updateNumber() {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + suffix;
                setTimeout(updateNumber, stepTime);
            } else {
                stat.textContent = target + suffix;
            }
        }
        
        // Start animation when stat comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
} 