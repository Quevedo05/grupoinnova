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

// ---- Hero unit switcher ----
function setHeroUnit(btn, logoSrc, alt) {
  const img = document.getElementById('heroUnitLogoImg');
  if (img) {
    img.style.opacity = '0';
    setTimeout(() => { img.src = logoSrc; img.alt = alt; img.style.opacity = '1'; }, 180);
  }
  const navLogo = document.querySelector('.nav-logo .logo-img');
  if (navLogo) {
    navLogo.style.transition = 'opacity .2s ease';
    navLogo.style.opacity = '0';
    setTimeout(() => { navLogo.src = logoSrc; navLogo.style.opacity = '1'; }, 180);
  }
  document.querySelectorAll('.hero-btns .btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ---- Unidades logo switcher ----
function setUnidad(el, logoSrc) {
  const logo = document.getElementById('unidadLogo');
  if (!logo) return;
  logo.style.opacity = '0';
  setTimeout(() => { logo.src = logoSrc; logo.style.opacity = '1'; }, 200);

  const navLogo = document.querySelector('.nav-logo .logo-img');
  if (navLogo) {
    navLogo.style.transition = 'opacity .2s ease';
    navLogo.style.opacity = '0';
    setTimeout(() => { navLogo.src = logoSrc; navLogo.style.opacity = '1'; }, 200);
  }

  document.querySelectorAll('.unidad-item').forEach(i => i.classList.remove('highlight'));
  el.classList.add('highlight');
}

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

// ---- AOS init ----
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 650, once: true, easing: 'ease-out-quad', offset: 40 });
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAOS);
} else {
  initAOS();
}

// ---- CountUp for stats ----
function runCountUp(el) {
  const target = parseInt(el.dataset.count, 10);
  const from = parseInt(el.dataset.from || '0', 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();

  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (target - from) * eased) + suffix;
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(step);
}

const countObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCountUp(entry.target);
      countObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-number[data-count]').forEach(el => countObs.observe(el));
