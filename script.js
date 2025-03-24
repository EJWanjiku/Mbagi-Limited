// Global variables
let currentSlideIndex = 1;

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    initializeNavigation();
    initializeHeroSlideshow();
    initializeProjectModals();
    scrollPromptFunctionality();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            if (this.getAttribute("href").startsWith("#")) {
                event.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                scrollToSection(targetId);
            }
        });
    });
}

function initializeHeroSlideshow() {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".line");
    let currentIndex = 0;
    let totalSlides = slides.length;

    if (totalSlides === 0) return;

    // Show the first slide immediately
    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add("active");
                dots[i].classList.add("active");
            } else {
                slide.classList.remove("active");
                dots[i].classList.remove("active");
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 5000); // Auto-slide every 5s
}

function initializeProjectModals() {
    // Add click event listeners to all project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            if (projectId) {
                openProjectModal(projectId);
            }
        });
    });
}

function openProjectModal(projectId) {
    console.log('Opening modal for project:', projectId);

    const modal = document.getElementById('project-modal');
    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    const projects = {
        'residential1': {
            title: 'Roslyn Gardens',
            dimensions: '10,000 sq ft',
            location: 'Roslyn, Nairobi',
            description: 'A collection of luxurious mansions set in a serene compound. Each home features premium finishes, spacious living areas, modern amenities, and beautiful landscaping. The development includes private gardens, secure parking, and 24/7 security.',
            images: [
                'images/roslyn1.jpg',
                'images/roslyn2.jpg',
                'images/roslyn3.jpg',
                'images/roslyn4.jpg'
            ]
        },
        'residential2': {
            title: 'Uthiru Condos',
            dimensions: '3,500 sq ft per unit',
            location: 'Uthiru, Nairobi',
            description: 'Modern apartment complex offering contemporary living spaces with stunning views. Features include open-plan layouts, high-end finishes, communal gardens, and secure parking. Perfect for urban professionals and families.',
            images: [
                'images/uthiru0.jpg',
                'images/uthiru1.jpg',
                'images/uthiru2.jpg',
                'images/uthiru3.jpg',
                'images/uthiru4.jpg',
                'images/uthiru5.jpg',
                'images/uthiru6.jpg',
                'images/uthiru7.jpg'
            ]
        },
        'commercial1': {
            title: 'Agip House',
            dimensions: '25,000 sq ft',
            location: 'Harambee Avenue, Nairobi',
            description: 'Premium office complex in the heart of Nairobi CBD. The building offers modern office spaces, meeting facilities, ample parking, and 24/7 security. Ideal for businesses looking for a prestigious address with excellent amenities.',
            images: ['images/agip1.jpg', 'images/agip2.jpg', 'images/agip3.jpg']
        }
    };

    const project = projects[projectId];
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }

    console.log('Project data:', project);

    // Update modal content
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-dimensions').textContent = project.dimensions;
    document.getElementById('modal-location').textContent = project.location;
    document.getElementById('modal-description').textContent = project.description;

    // Create slideshow HTML
    const modalSlideshow = modal.querySelector('.modal-slideshow');
    if (!modalSlideshow) {
        console.error('Modal slideshow element not found');
        return;
    }

    modalSlideshow.innerHTML = `
        ${project.images.map((img, index) => `
            <div class="modal-slide ${index === 0 ? 'active' : ''}">
                <img src="${img}" alt="${project.title} - View ${index + 1}">
            </div>
        `).join('')}
        <button class="slide-nav prev" onclick="changeSlide(-1)">❮</button>
        <button class="slide-nav next" onclick="changeSlide(1)">❯</button>
        <div class="slide-dots">
            ${project.images.map((_, index) => `
                <span class="slide-dot ${index === 0 ? 'active' : ''}" onclick="currentSlide(${index + 1})"></span>
            `).join('')}
        </div>
    `;

    // Reset slide index and show first slide
    currentSlideIndex = 1;
    showSlides(currentSlideIndex);

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Set up close handlers
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = function() {
        closeModal(modal);
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    };
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function changeSlide(n) {
    showSlides(currentSlideIndex += n);
}

function currentSlide(n) {
    showSlides(currentSlideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("modal-slide");
    const dots = document.getElementsByClassName("slide-dot");
    
    if (!slides.length) return;

    if (n > slides.length) {currentSlideIndex = 1}
    if (n < 1) {currentSlideIndex = slides.length}

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[currentSlideIndex-1].style.display = "block";
    dots[currentSlideIndex-1].className += " active";
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Scroll prompt functionality
function scrollPromptFunctionality() {
    const scrollPrompt = document.querySelector('.scroll-prompt');
    
    if (scrollPrompt) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollPrompt.classList.add('hidden');
            } else {
                scrollPrompt.classList.remove('hidden');
            }
        });
    }
}

// Email handling function
function sendEmail(event) {
    event.preventDefault();

    // Show loading state
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Get the form
    const form = event.target;
    const userEmail = form.querySelector('[name="email"]').value;
    const userName = form.querySelector('[name="name"]').value;

    // Send the main email
    emailjs.sendForm('service_9gjsm29', 'template_m4371uf', form)
        .then(function(response) {
            console.log('Main email sent:', response.status, response.text);
            
            // Send auto-reply email with just name and email
            return emailjs.send('service_9gjsm29', 'template_pr3nq5r', {
                email: userEmail,
                name: userName
            });
        })
        .then(function(response) {
            console.log('Auto-reply sent:', response.status, response.text);
            alert('Message sent successfully!');
            form.reset();
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again later.');
        })
        .finally(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}
