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
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
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
  progressSlider.innerHTML = '';
  sectionsOrder.forEach(section => {
    const segment = document.createElement('div');
    segment.className = 'progress-segment';
    segment.dataset.sectionId = section.id;
    
    const button = document.createElement('button');
    button.className = 'progress-button';
    button.textContent = section.name;
    button.onclick = () => { scrollToSection(section.id); };

    const fill = document.createElement('div');
    fill.className = 'segment-fill';

    segment.appendChild(button);
    segment.appendChild(fill);
    progressSlider.appendChild(segment);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createProgressSegments();

  // ===== Projekt Modal - slideshow funkce =====
  const projectModal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDetail = document.getElementById('modalDetail');
  const modalSlideshow = document.getElementById('modalSlideshow');
  const arrowLeft = document.getElementById('arrowLeft');
  const arrowRight = document.getElementById('arrowRight');

  let currentSlideIndex = 0;
  let images = [];

  // Otevře modal s informacemi o projektu
  function openProjectModal(tile) {
    // Nastavíme obsah
    const title = tile.dataset.title || 'Neznámý projekt';
    const detail = tile.dataset.detail || 'Bez detailů.';
    const slidesStr = tile.dataset.slides || '';
    const slidesArr = slidesStr.split(',');

    modalTitle.textContent = title;
    modalDetail.textContent = detail;

    // Vyčistíme staré obrázky
    modalSlideshow.innerHTML = '';
    images = [];

    // Vytvoříme obrázky
    slidesArr.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src.trim();
      img.alt = `Slide ${index + 1}`;
      // V CSS je default opacity:0, tady přidáme .active jen prvnímu
      if (index === 0) {
        img.classList.add('active');
      }
      modalSlideshow.appendChild(img);
      images.push(img);
    });

    currentSlideIndex = 0;
    projectModal.style.display = 'flex';

    // Animace otevření
    gsap.fromTo(projectModal, { opacity: 0 }, { duration: 0.3, opacity: 1 });
  }

  // Zavře modal
  function closeProjectModal() {
    gsap.to(projectModal, {
      duration: 0.3,
      opacity: 0,
      onComplete: () => {
        projectModal.style.display = 'none';
      }
    });
  }

  // Změní slide
  function showSlide(newIndex) {
    if (!images.length) return;
    // Ujistíme se, že index je v platném rozsahu
    currentSlideIndex = (newIndex + images.length) % images.length;
    images.forEach(img => img.classList.remove('active'));
    images[currentSlideIndex].classList.add('active');
  }

  arrowLeft.addEventListener('click', (e) => {
    e.stopPropagation(); // aby se modal nezavřel
    showSlide(currentSlideIndex - 1);
  });

  arrowRight.addEventListener('click', (e) => {
    e.stopPropagation();
    showSlide(currentSlideIndex + 1);
  });

  // Kliknutí mimo modal => zavřít
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  // Přidáme eventListener na každou dlaždici
  document.querySelectorAll('.project-tile').forEach(tile => {
    tile.addEventListener('click', (e) => {
      e.preventDefault();
      openProjectModal(tile);
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
