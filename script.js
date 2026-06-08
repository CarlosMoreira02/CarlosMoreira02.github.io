/* ============================================
   Portfolio Landing Page — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Particle Canvas ──
  initParticles();

  // ── Scroll-triggered Animations ──
  initScrollReveal();

  // ── Navbar Scroll Effect ──
  initNavbar();

  // ── Mobile Menu ──
  initMobileMenu();

  // ── Back to Top Button ──
  initBackToTop();

  // ── Counter Animation ──
  initCounters();

  // ── Smooth Scroll ──
  initSmoothScroll();

});

/* ────────────────────────────────────────────
   PARTICLE CANVAS
   ──────────────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let width, height;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 15000), 80);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const alpha = (1 - dist / 150) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity})`;
      ctx.fill();
    }
  }

  function updateParticles() {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }
  }

  function animate() {
    updateParticles();
    drawParticles();
    animationId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  resize();
  createParticles();
  animate();
}

/* ────────────────────────────────────────────
   SCROLL REVEAL ANIMATION
   ──────────────────────────────────────────── */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: Unobserve after revealing for performance
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* ────────────────────────────────────────────
   NAVBAR SCROLL EFFECT
   ──────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

/* ────────────────────────────────────────────
   MOBILE MENU
   ──────────────────────────────────────────── */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const links = document.getElementById('navbar-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ────────────────────────────────────────────
   BACK TO TOP
   ──────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ────────────────────────────────────────────
   ANIMATED COUNTERS
   ──────────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

function animateCounter(el, target) {
  let current = 0;
  const duration = 2000;
  const step = Math.ceil(target / (duration / 16));
  const suffix = el.textContent.includes('+') ? '+' : '';

  function update() {
    current += step;
    if (current >= target) {
      current = target;
      el.textContent = current + suffix;
      return;
    }
    el.textContent = current + suffix;
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ────────────────────────────────────────────
   SMOOTH SCROLL
   ──────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
}
