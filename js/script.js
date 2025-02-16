// ===== Preloader =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  // Zpoždění, aby byl vidět loader, poté skryjeme
  setTimeout(() => {
    preloader.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 800); 
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

// ===== IntersectionObserver pro fade-in animace =====
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

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
  if (window.pageYOffset > 50) {
    header.style.padding = '10px 20px';
  } else {
    header.style.padding = '15px 20px';
  }
});

// ===== Tilt Effect (vanilkové řešení) =====
const tiltElements = document.querySelectorAll('.tilt');

tiltElements.forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // X pozice uvnitř elementu
    const y = e.clientY - rect.top;  // Y pozice uvnitř elementu
    const width = rect.width;
    const height = rect.height;
    
    // Vypočítej offset
    const rotateX = (y - height / 2) / 10; 
    const rotateY = (x - width / 2) / 10;

    el.style.transform = `perspective(600px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

