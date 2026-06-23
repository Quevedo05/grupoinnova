/* ========================================
   Grupo Innova – JS
   ======================================== */

// Navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// (hero slider removed — now uses CSS gradient background)

// ---- Gallery Slider ----
const galleryTrack = document.getElementById('galleryTrack');
const galleryItems = galleryTrack ? galleryTrack.querySelectorAll('.gallery-item') : [];
const itemsVisible = window.innerWidth > 600 ? 3 : 1;
let galIdx = 0;
const galMax = Math.max(0, galleryItems.length - itemsVisible);

function moveGallery(dir) {
  galIdx = Math.max(0, Math.min(galMax, galIdx + dir));
  const pct = (100 / itemsVisible) * galIdx;
  galleryTrack.style.transform = `translateX(-${pct}%)`;
}

document.querySelector('.gal-prev')?.addEventListener('click', () => moveGallery(-1));
document.querySelector('.gal-next')?.addEventListener('click', () => moveGallery(1));

// ---- Equipo Slider ----
const equipoCards = document.querySelectorAll('.equipo-card');
const equipoDots = document.getElementById('equipoDots');
let equipoIdx = 0;

equipoCards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'equipo-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goEquipo(i));
  equipoDots?.appendChild(dot);
});

function goEquipo(idx) {
  equipoCards[equipoIdx].classList.remove('active');
  equipoDots?.children[equipoIdx].classList.remove('active');
  equipoIdx = (idx + equipoCards.length) % equipoCards.length;
  equipoCards[equipoIdx].classList.add('active');
  equipoDots?.children[equipoIdx].classList.add('active');
}

setInterval(() => goEquipo(equipoIdx + 1), 4000);

// ---- RC Mower gallery ----
function rcSetMain(thumb) {
  document.getElementById('rcMainImg').src = thumb.src;
  document.querySelectorAll('.rc-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

// ---- Contact Form ----
const form = document.getElementById('contactoForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const msg = `Hola! Me llamo ${data.nombre}. ${data.mensaje} (Email: ${data.email}${data.telefono ? ', Tel: ' + data.telefono : ''})`;
  window.open(`https://wa.me/5492645799789?text=${encodeURIComponent(msg)}`, '_blank');
});

// ---- Smooth scroll offset for fixed navbar ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Reveal on scroll ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card-intro, .servicio-item, .stat-item, .unidad-item, .equipo-col').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Add reveal styles dynamically
const style = document.createElement('style');
style.textContent = `
  .reveal { opacity: 0; transform: translateY(22px); transition: opacity .5s ease, transform .5s ease; }
  .reveal.visible { opacity: 1; transform: none; }
`;
document.head.appendChild(style);
