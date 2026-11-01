(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }

  const heroTrack = document.querySelector('.hero-track');
  if (heroTrack) {
    const slides = [...document.querySelectorAll('.hero-slide')];
    const dots = [...document.querySelectorAll('.hero-dots button')];
    let index = 0;
    const setHero = (next) => {
      index = (next + slides.length) % slides.length;
      heroTrack.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };
    document.querySelector('.hero-prev')?.addEventListener('click', () => setHero(index - 1));
    document.querySelector('.hero-next')?.addEventListener('click', () => setHero(index + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => setHero(i)));
    let timer = setInterval(() => setHero(index + 1), 6000);
    document.querySelector('.hero')?.addEventListener('mouseenter', () => clearInterval(timer));
  }

  document.querySelectorAll('.product-rail').forEach((rail) => {
    const grid = rail.querySelector('[data-rail]');
    rail.querySelector('.rail-prev')?.addEventListener('click', () => grid.scrollBy({ left: -grid.clientWidth, behavior: 'smooth' }));
    rail.querySelector('.rail-next')?.addEventListener('click', () => grid.scrollBy({ left: grid.clientWidth, behavior: 'smooth' }));
  });

  const filters = [...document.querySelectorAll('[data-filter]')];
  if (filters.length) {
    const cards = [...document.querySelectorAll('[data-cats]')];
    const count = document.querySelector('.products-count');
    filters.forEach((button) => {
      button.addEventListener('click', () => {
        filters.forEach((item) => item.classList.toggle('active', item === button));
        const value = button.dataset.filter;
        let visible = 0;
        cards.forEach((card) => {
          const show = value === 'all' || card.dataset.cats.split(' ').includes(value);
          card.hidden = !show;
          if (show) visible += 1;
        });
        if (count) count.textContent = `${visible} producto${visible === 1 ? '' : 's'}`;
      });
    });
    const category = new URLSearchParams(location.search).get('cat');
    const preset = filters.find((button) => button.dataset.filter === category);
    preset?.click();
  }
})();
