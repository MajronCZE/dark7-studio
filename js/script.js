// ===== Preloader =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
  }, 800);
  initGsapAnimations();
});

// ===== Custom Cursor =====
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

// ===== Hamburger Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('show');
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !expanded);
});

// ===== Smooth Scroll =====
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) { section.scrollIntoView({ behavior: 'smooth' }); }
}

// ===== GSAP a ScrollTrigger Animace =====
function initGsapAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero animace (sekvenční)
  const heroTl = gsap.timeline();
  heroTl.from("#home h1 .line", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2,
  })
  .from("#home p", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  }, "-=0.4")
  .from("#home .btn", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
  }, "-=0.4");

  // Animace pro sekce s ScrollTrigger
  const sections = document.querySelectorAll('section.fade-in');
  sections.forEach(sec => {
    gsap.from(sec, {
      scrollTrigger: {
        trigger: sec,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out"
    });
  });
}

// ===== Scroll To Top Button =====
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Header shrink on scroll =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.padding = window.pageYOffset > 50 ? '10px 20px' : '15px 20px';
});

// ===== Tilt Effect =====
const tiltElements = document.querySelectorAll('.tilt');
tiltElements.forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 10;
    const rotateY = (x - rect.width / 2) / 10;
    el.style.transform = `perspective(600px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

// ===== Segmented Progress Slider and Section Buttons =====
const sectionsOrder = [
  { id: 'home', name: 'Domů' },
  { id: 'projects', name: 'Projekty' },
  { id: 'team', name: 'Náš tým' },
  { id: 'blog', name: 'Blog' },
  { id: 'news', name: 'Novinky' },
  { id: 'faq', name: 'FAQ' },
  { id: 'contact', name: 'Kontakt' }
];

function createProgressSegments() {
  const progressSlider = document.getElementById('progressSlider');
  progressSlider.innerHTML = ''; // Clear existing content
  sectionsOrder.forEach(section => {
    // Create segment container
    const segment = document.createElement('div');
    segment.className = 'progress-segment';
    segment.dataset.sectionId = section.id;
    
    // Create navigation button (always visible)
    const button = document.createElement('button');
    button.className = 'progress-button';
    button.textContent = section.name;
    button.onclick = () => {
      scrollToSection(section.id);
    };

    // Create fill bar element
    const fill = document.createElement('div');
    fill.className = 'segment-fill';

    segment.appendChild(button);
    segment.appendChild(fill);
    progressSlider.appendChild(segment);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createProgressSegments();

  // ===== Projekt-tile rozbalování =====
  document.querySelectorAll('.project-tile').forEach(tile => {
    tile.addEventListener('click', (e) => {
      e.preventDefault();

      // Pokud je dlaždice již rozbalená, zavřeme ji
      if(tile.classList.contains('expanded')){
        gsap.to(tile, { duration: 0.5, scale: 1, x: 0, y: 0 });
        tile.classList.remove('expanded');
        const detail = tile.querySelector('.project-detail');
        if(detail) detail.style.display = 'none';
      } else {
        // Získáme pozici dlaždice a spočítáme posun do středu
        const rect = tile.getBoundingClientRect();
        const centerX = (window.innerWidth / 2) - (rect.width / 2) - rect.left;
        const centerY = (window.innerHeight / 2) - (rect.height / 2) - rect.top;

        gsap.to(tile, { 
          duration: 0.5, 
          scale: 1.2, 
          x: centerX, 
          y: centerY, 
          onComplete: () => {
            const detail = tile.querySelector('.project-detail');
            if(detail) detail.style.display = 'block';
          }
        });
        tile.classList.add('expanded');
      }
    });
  });
});

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  sectionsOrder.forEach((section, index) => {
    const sectionEl = document.getElementById(section.id);
    if (sectionEl) {
      const triggerPoint = sectionEl.offsetTop - window.innerHeight / 2;
      const segment = document.querySelector(`.progress-segment[data-section-id="${section.id}"]`);
      if (scrollTop >= triggerPoint) {
        segment.classList.add('filled');
        let nextTrigger = Infinity;
        if (index < sectionsOrder.length - 1) {
          const nextSectionEl = document.getElementById(sectionsOrder[index + 1].id);
          nextTrigger = nextSectionEl.offsetTop - window.innerHeight / 2;
        }
        if (scrollTop < nextTrigger) {
          segment.classList.add('active');
        } else {
          segment.classList.remove('active');
        }
      } else {
        segment.classList.remove('filled');
        segment.classList.remove('active');
      }
    }
  });
});
