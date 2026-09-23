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
