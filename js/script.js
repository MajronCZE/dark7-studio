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

// ===== Progress Slider =====
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = progress + '%';
});
