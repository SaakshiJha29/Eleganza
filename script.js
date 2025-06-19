// Loader Functionality
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const counter = document.getElementById('loader-counter');
    let count = 3;

    const countdown = setInterval(() => {
        count--;
        counter.textContent = `Opening in ${count}...`;
        
        if (count <= 0) {
            clearInterval(countdown);
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                // Initialize AOS after loader
                AOS.init({
                    duration: 800,
                    once: true
                });
            }, 500);
        }
    }, 1000);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    if (scrollTop === 0) {
        navbar.classList.remove('shadow-md');
    } else {
        navbar.classList.add('shadow-md');
    }
    
    lastScrollTop = scrollTop;
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('show');
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function enableDarkMode() {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', 'dark');
}

function disableDarkMode() {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', 'light');
}

// Initialize dark mode based on saved preference or system preference
function initializeTheme() {
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

// Toggle dark mode on button click
themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }
});

// Initialize theme on page load
initializeTheme();

// Carousel Functionality
const carousel = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let currentSlide = 0;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselItems.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Customer Section Data
const customers = [
    {
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        quote: 'Amazing collection and great quality! The customer service is exceptional.',
        rating: 5
    },
    {
        name: 'Michael Chen',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        quote: 'Best shopping experience ever. The website is so easy to navigate.',
        rating: 5
    },
    {
        name: 'Emily Davis',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        quote: 'Love the variety of products and fast shipping!',
        rating: 4
    }
];

// Populate Customer Section
const customerSection = document.querySelector('#customers .grid');

customers.forEach(customer => {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover-card';
    card.setAttribute('data-aos', 'fade-up');
    
    const stars = '★'.repeat(customer.rating) + '☆'.repeat(5 - customer.rating);
    
    card.innerHTML = `
        <div class="flex items-center mb-4">
            <img src="${customer.avatar}" alt="${customer.name}" class="w-12 h-12 rounded-full mr-4">
            <div>
                <h4 class="font-semibold">${customer.name}</h4>
                <div class="text-yellow-500">${stars}</div>
            </div>
        </div>
        <p class="text-gray-600 dark:text-gray-300">"${customer.quote}"</p>
    `;
    
    customerSection.appendChild(card);
});

// Testimonials Data
const testimonials = [
    {
        name: 'Jessica Williams',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        quote: 'The quality of clothes is outstanding. I\'ve been a loyal customer for 2 years now.',
        role: 'Fashion Blogger'
    },
    {
        name: 'David Kim',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        quote: 'Great prices and even better service. Highly recommended!',
        role: 'Regular Customer'
    },
    {
        name: 'Amanda Brown',
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
        quote: 'The website is so user-friendly and the delivery is always on time.',
        role: 'Lifestyle Influencer'
    }
];

// Populate Testimonials Section
const testimonialsCarousel = document.querySelector('.testimonials-carousel');

testimonials.forEach((testimonial, index) => {
    const card = document.createElement('div');
    card.className = `testimonial-card ${index === 0 ? 'active' : ''} bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg`;
    
    card.innerHTML = `
        <div class="flex items-center mb-4">
            <img src="${testimonial.avatar}" alt="${testimonial.name}" class="w-16 h-16 rounded-full mr-4">
            <div>
                <h4 class="font-semibold">${testimonial.name}</h4>
                <p class="text-gray-500 dark:text-gray-400">${testimonial.role}</p>
            </div>
        </div>
        <p class="text-gray-600 dark:text-gray-300 italic">"${testimonial.quote}"</p>
    `;
    
    testimonialsCarousel.appendChild(card);
});

// Newsletter Popup
function showNewsletterPopup() {
    // Check if user has already closed the popup
    if (localStorage.getItem('newsletter_closed')) {
        return;
    }
    
    const popup = document.getElementById('newsletter-popup');
    popup.classList.remove('hidden');
    popup.classList.add('flex');
}

function closeNewsletterPopup() {
    const popup = document.getElementById('newsletter-popup');
    popup.classList.add('hidden');
    popup.classList.remove('flex');
    
    // Set a flag in localStorage to remember user's choice
    localStorage.setItem('newsletter_closed', 'true');
    
    // Clear the flag after 24 hours
    setTimeout(() => {
        localStorage.removeItem('newsletter_closed');
    }, 24 * 60 * 60 * 1000);
}

// Show newsletter popup after 10 seconds if not closed before
let hasShownPopup = false;
window.addEventListener('scroll', () => {
    if (!hasShownPopup && window.scrollY > 300) {
        setTimeout(showNewsletterPopup, 1000);
        hasShownPopup = true;
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add ripple effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.classList.add('ripple');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Update active link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Form Validation and Submission
const loginForm = document.querySelector('#login form');
const signupForm = document.querySelector('#signup form');

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.classList.add('border-red-500');
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(loginForm)) {
            // Add login logic here
            console.log('Login form submitted');
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(signupForm)) {
            // Add signup logic here
            console.log('Signup form submitted');
        }
    });
}

// Chat Button Functionality
const chatButton = document.getElementById('chat-button');

chatButton.addEventListener('click', () => {
    // Add chat functionality here
    console.log('Chat button clicked');
});

// Add intersection observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
});

document.querySelectorAll('[data-aos]').forEach((element) => {
    observer.observe(element);
});

// Stats Modal Functionality
function openStatsModal() {
    const modal = document.getElementById('stats-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    initializeCharts();
    animateMetrics();
}

function closeStatsModal() {
    const modal = document.getElementById('stats-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Chart.js Charts
function initializeCharts() {
    // Customer Growth Chart - Static version
    const customerCtx = document.getElementById('customerGrowthChart').getContext('2d');
    new Chart(customerCtx, {
        type: 'bar',
        data: {
            labels: ['2010', '2015', '2020', '2024'],
            datasets: [{
                label: 'Customer Growth',
                data: [1000, 25000, 45000, 100000],
                backgroundColor: [
                    'rgba(236, 72, 153, 0.7)',
                    'rgba(236, 72, 153, 0.7)',
                    'rgba(236, 72, 153, 0.7)',
                    'rgba(236, 72, 153, 0.7)'
                ],
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        callback: function(value) {
                            return (value / 1000) + 'K';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Sales Chart - Static version
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'bar',
        data: {
            labels: ['2010', '2015', '2020', '2024'],
            datasets: [{
                label: 'Annual Sales ($M)',
                data: [0.5, 2.5, 8.5, 15.2],
                backgroundColor: [
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(139, 92, 246, 0.7)'
                ],
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'M';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Animate Metrics
function animateMetrics() {
    const metrics = [
        { element: 'totalCustomers', target: 100000, suffix: '' },
        { element: 'totalSales', target: 15.2, suffix: 'M' },
        { element: 'avgOrder', target: 152, suffix: '' },
        { element: 'retention', target: 85, suffix: '%' }
    ];

    metrics.forEach(metric => {
        const element = document.getElementById(metric.element);
        let current = 0;
        const increment = metric.target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= metric.target) {
                current = metric.target;
                clearInterval(timer);
            }
            
            if (metric.element === 'totalSales') {
                element.textContent = `$${current.toFixed(1)}${metric.suffix}`;
            } else if (metric.element === 'retention') {
                element.textContent = `${Math.round(current)}${metric.suffix}`;
            } else {
                element.textContent = Math.round(current).toLocaleString() + metric.suffix;
            }
        }, 50);
    });
} 