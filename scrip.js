// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate circular progress bars
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.circular-progress');
        
        progressBars.forEach(bar => {
            const percentage = parseInt(bar.getAttribute('data-percentage'));
            const circle = bar.querySelector('.progress-circle');
            const percentageText = bar.querySelector('.percentage');
            
            // Animate the circular progress
            let currentPercentage = 0;
            const increment = percentage / 100;
            
            const timer = setInterval(() => {
                currentPercentage += increment;
                if (currentPercentage >= percentage) {
                    currentPercentage = percentage;
                    clearInterval(timer);
                }
                
                const degrees = (currentPercentage / 100) * 360;
                circle.style.background = `conic-gradient(var(--primary-color) ${degrees}deg, var(--gray-200) ${degrees}deg)`;
                percentageText.textContent = Math.round(currentPercentage) + '%';
            }, 20);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('results')) {
                    animateProgressBars();
                }
                
                // Add fade-in animation to cards
                const cards = entry.target.querySelectorAll('.service-card, .quality-card, .result-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('.services, .about, .results');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Initialize card animations
    const cards = document.querySelectorAll('.service-card, .quality-card, .result-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.floating-card');
        
        if (parallaxElement) {
            const speed = scrolled * 0.5;
            parallaxElement.style.transform = `translateY(${speed}px)`;
        }
    });

    // Add hover effects to navigation
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 30);
        }, 500);
    }
});

// Contact button functionality
function redirectToContact() {
    // Create a simple contact page or redirect to external contact form
    const contactWindow = window.open('', '_blank', 'width=600,height=400');
    contactWindow.document.write(`
 
    `);
}

// Add smooth reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.service-card, .quality-card, .about-description');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize AOS-like animations
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .quality-card, .about-description {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.6s ease;
        }
        
        .service-card.active, .quality-card.active, .about-description.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});