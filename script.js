// ---------- Hero: animated Lissajous curves ----------
(function () {
  const canvas = document.getElementById('curve');
  const label = document.getElementById('curve-label');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // x = sin(a t + phase), y = sin(b t)
  const curves = [
    { a: 3, b: 4 }, { a: 5, b: 4 }, { a: 3, b: 2 }, { a: 5, b: 6 }, { a: 1, b: 2 },
  ];
  let idx = 0, progress = 0, phase = 0;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const r = canvas.getBoundingClientRect();
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function accent() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#e8542f';
  }

  function draw() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const R = Math.min(w, h) * 0.38;
    const cx = w / 2, cy = h / 2;
    const { a, b } = curves[idx];
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 2.25;
    ctx.lineCap = 'round';
    ctx.strokeStyle = accent();
    ctx.beginPath();
    const total = Math.PI * 2;
    const end = total * progress;
    const steps = 900;
    for (let i = 0; i <= steps; i++) {
      const t = (end * i) / steps;
      const x = cx + R * Math.sin(a * t + phase);
      const y = cy - R * Math.sin(b * t);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // moving point
    const tx = cx + R * Math.sin(a * end + phase), ty = cy - R * Math.sin(b * end);
    ctx.fillStyle = accent();
    ctx.beginPath(); ctx.arc(tx, ty, 5, 0, Math.PI * 2); ctx.fill();
  }

  function setLabel() {
    const { a, b } = curves[idx];
    label.textContent = `x = sin(${a === 1 ? '' : a}t), y = sin(${b}t)`;
  }

  let hold = 0;
  function tick() {
    if (progress < 1) {
      progress = Math.min(1, progress + 0.006);
    } else if (++hold > 110) {
      hold = 0; progress = 0; idx = (idx + 1) % curves.length; setLabel();
    }
    phase += 0.002;
    draw();
    requestAnimationFrame(tick);
  }

  resize();
  setLabel();
  window.addEventListener('resize', () => { resize(); draw(); });
  if (reduce) { progress = 1; draw(); } else { requestAnimationFrame(tick); }
})();

// ---------- Project filters ----------
(function () {
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.card');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.toggle('active', c === chip));
      const f = chip.dataset.filter;
      cards.forEach((card) => {
        const show = f === 'all' || card.dataset.tags.split(' ').includes(f);
        card.classList.toggle('hidden', !show);
      });
    });
  });
})();

// ---------- Reveal on scroll + active nav ----------
(function () {
  const els = document.querySelectorAll('.card, .timeline li, .stats div, .section-head');
  if (!('IntersectionObserver' in window)) return;
  els.forEach((el) => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));

  const links = document.querySelectorAll('.nav nav a');
  const sections = [...links].map((a) => document.querySelector(a.getAttribute('href')));
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => l.classList.toggle('current', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => s && navIO.observe(s));
})();

document.getElementById('year').textContent = new Date().getFullYear();
