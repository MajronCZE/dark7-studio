// ===== Preloader =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
  }, 800);
  initGsapAnimations();
  updateProgressBar(); // inicializace progress baru
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
    section.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
  }
}

// ===== GSAP a ScrollTrigger Animace =====
function initGsapAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  
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
  updateProgressBar();
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Header shrink on scroll =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.padding = window.pageYOffset > 50 ? '5px 10px' : '5px 10px';
});

// ===== Flipping Projekt dlaždice =====
function flipTile(tile) {
  const projectItem = tile.querySelector('.project-item');
  const isFlipped = projectItem.classList.contains('flipped');
  if (!isFlipped) {
    // Při otevírání dlaždice se přesune do středu
    tile.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  projectItem.classList.toggle('flipped');
}

// ===== Slider Funkcionalita =====
function changeSlide(btn, direction) {
  const slider = btn.closest('.slider');
  const slides = slider.querySelectorAll('.slide');
  let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
  slides[currentIndex].classList.remove('active');
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = slides.length - 1;
  if (currentIndex >= slides.length) currentIndex = 0;
  slides[currentIndex].classList.add('active');
}

// ===== Aktualizace Progress Baru =====
function updateProgressBar() {
  const sections = document.querySelectorAll('section');
  const progressSegments = document.querySelectorAll('#progressSlider .progress-segment');
  const sectionIds = Array.from(sections).map(s => s.id);
  let activeSectionId = null;
  
  // Určíme poslední sekci, jejíž horní hrana je nad polovinou viewportu
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2) {
      activeSectionId = section.id;
    }
  });
  
  const activeIndex = sectionIds.indexOf(activeSectionId);
  
  progressSegments.forEach(segment => {
    const target = segment.getAttribute('data-target');
    const targetIndex = sectionIds.indexOf(target);
    if (activeIndex !== -1 && targetIndex <= activeIndex) {
      segment.classList.add('visible');
    } else {
      segment.classList.remove('visible');
    }
    if (targetIndex === activeIndex) {
      segment.classList.add('active');
    } else {
      segment.classList.remove('active');
    }
  });
  
  // Aktualizace zobrazeného názvu aktuální sekce
  const activeSectionName = document.getElementById("activeSectionName");
  if (activeSectionName) {
    let activeText = "";
    progressSegments.forEach(segment => {
      if (segment.classList.contains('active')) {
        activeText = segment.innerText;
      }
    });
    activeSectionName.innerText = activeText;
  }
}
