// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const themeBtn = document.getElementById('theme-btn');
const themeIcon = themeBtn.querySelector('i');
const yearSpan = document.getElementById('year');
const portfolioGrid = document.getElementById('portfolio-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// State Variables
let allProjects = [];

// 1. Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// 2. Dark Mode Toggle
// Check for saved user preference, if any, on load of the website
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Toggle Icon
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// 3. Update Footer Year
yearSpan.textContent = new Date().getFullYear();

// 4. Smooth Scrolling & Active Link Update on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    // Add shadow to navbar on scroll
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
        navbar.style.boxShadow = document.body.classList.contains('dark-mode')
            ? '0 2px 10px rgba(0,0,0,0.3)'
            : '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = document.body.classList.contains('dark-mode')
            ? '0 2px 10px rgba(0,0,0,0.3)'
            : '0 2px 10px rgba(0,0,0,0.05)';
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 5. Scroll Reveal Animation using Intersection Observer
// Optional feature: reveal elements nicely as user scrolls
const revealElements = document.querySelectorAll('.element-reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function (entries, revealObserver) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// 6. Fetching and Rendering Projects
async function getProjects() {
    try {
        const response = await fetch('projects.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        allProjects = data;

        // Render initially (All)
        renderProjects(allProjects);

    } catch (error) {
        console.error("Could not load projects:", error);
        portfolioGrid.innerHTML = `
            <div class="loading">
                <p>Gagal memuat projects. Pastikan jalankan di server (Live Server) atau periksa file projects.json.</p>
                <p style="font-size: 0.8rem; margin-top: 10px; color: var(--text-light);">Error: ${error.message}</p>
            </div>
        `;
    }
}

function renderProjects(projects) {
    if (projects.length === 0) {
        portfolioGrid.innerHTML = `<div class="loading">Tidak ada project untuk kategori ini.</div>`;
        return;
    }

    portfolioGrid.innerHTML = projects.map(project => {
        const isGallery = Array.isArray(project.preview);
        const coverImage = isGallery ? project.preview[0] : project.preview;
        const galleryData = encodeURIComponent(JSON.stringify(isGallery ? project.preview : [project.preview]));

        return `
        <div class="project-card">
            <div class="project-img" style="cursor: pointer;" onclick="openLightbox('${galleryData}', '${project.title}')" title="Klik untuk mengintip ${isGallery ? 'emua slide' : 'desain penuh'}">
                <img src="${coverImage}" alt="${project.title}" loading="lazy">
                ${isGallery ? '<span class="category-tag" style="left: 20px; right: auto; background-color: rgba(59, 130, 246, 0.8);"><i class="fa-solid fa-images"></i> Slider</span>' : ''}
                <span class="category-tag">${project.category}</span>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${project.category === 'Web' || (project.demoUrl && project.demoUrl !== '#') || (project.githubUrl && project.githubUrl !== '#') ? `
                <div class="project-links">
                    <a href="${project.demoUrl && project.demoUrl !== '#' ? project.demoUrl : '#'}" target="${project.demoUrl && project.demoUrl !== '#' ? '_blank' : '_self'}" class="link-btn demo-btn" ${!project.demoUrl || project.demoUrl === '#' ? 'onclick="alert(\\\'Link Demo belum tersedia / belum di-hosting.\\\'); return false;"' : ''}>
                        <i class="fa-solid fa-eye"></i> Demo
                    </a>
                    <a href="${project.githubUrl && project.githubUrl !== '#' ? project.githubUrl : '#'}" target="${project.githubUrl && project.githubUrl !== '#' ? '_blank' : '_self'}" class="link-btn github-btn" ${!project.githubUrl || project.githubUrl === '#' ? 'onclick="alert(\\\'Link Repository belum tersedia.\\\'); return false;"' : ''}>
                        <i class="fa-brands fa-github"></i> Code
                    </a>
                </div>` : ''}
            </div>
        </div>
        `;
    }).join('');
}

// 7. Filtering Feature
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filter projects
        if (filterValue === 'All') {
            renderProjects(allProjects);
        } else {
            const filtered = allProjects.filter(project => project.category === filterValue);
            renderProjects(filtered);
        }
    });
});

// 8. Typing Effect
const typingText = document.querySelector('.typing-text');
const roles = ["Mahasiswa Teknik Informatika", "IT Support", "Front End Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentRole = roles[roleIndex];
    let typeSpeed = isDeleting ? 40 : 100;

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    getProjects();

    // Start typing effect logic
    if (typingText) {
        typingText.textContent = '';
        setTimeout(typeEffect, 1000);
    }
});

// 9. Lightbox (Full Image Viewer) Logic
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

let currentGallery = [];
let currentGalleryIndex = 0;
let currentTitle = "";

window.openLightbox = function (encodedGallery, title) {
    if (!lightboxModal) return;

    currentGallery = JSON.parse(decodeURIComponent(encodedGallery));
    currentGalleryIndex = 0;
    currentTitle = title;

    if (currentGallery.length > 1) {
        if (prevBtn) prevBtn.style.display = 'block';
        if (nextBtn) nextBtn.style.display = 'block';
    } else {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }

    lightboxModal.style.display = 'flex';
    setTimeout(() => {
        lightboxModal.classList.add('show');
    }, 10);

    updateLightboxImage();
    document.body.style.overflow = 'hidden';
};

function updateLightboxImage() {
    if (currentGallery.length === 0) return;
    lightboxImg.src = currentGallery[currentGalleryIndex];
    lightboxCaption.textContent = currentGallery.length > 1
        ? `${currentTitle} (${currentGalleryIndex + 1} dari ${currentGallery.length})`
        : currentTitle;
}

function closeLightboxFunc() {
    lightboxModal.classList.remove('show');
    setTimeout(() => {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

if (closeLightbox) {
    closeLightbox.addEventListener('click', closeLightboxFunc);
}

if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentGallery.length <= 1) return;
        currentGalleryIndex = (currentGalleryIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxImage();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentGallery.length <= 1) return;
        currentGalleryIndex = (currentGalleryIndex + 1) % currentGallery.length;
        updateLightboxImage();
    });
}

if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightboxFunc();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('show')) return;

    if (e.key === 'Escape') {
        closeLightboxFunc();
    } else if (e.key === 'ArrowLeft' && currentGallery.length > 1) {
        currentGalleryIndex = (currentGalleryIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxImage();
    } else if (e.key === 'ArrowRight' && currentGallery.length > 1) {
        currentGalleryIndex = (currentGalleryIndex + 1) % currentGallery.length;
        updateLightboxImage();
    }
});
