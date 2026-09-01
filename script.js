/* =============================================================
   CONVITE DE CASAMENTO — Alisson & Francieli
   script.js
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===========================================================
     1. TELA DE CARREGAMENTO
     =========================================================== */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('loader-hidden'), 400);
  });
  // segurança: caso o evento "load" demore, esconde de qualquer forma
  setTimeout(() => loader && loader.classList.add('loader-hidden'), 3500);

  /* ===========================================================
     2. DATA DO CASAMENTO — ALTERE AQUI
     Formato: 'AAAA-MM-DDTHH:MM:SS'
     =========================================================== */
  const WEDDING_DATE = new Date('2026-12-19T17:00:00');

  function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    const els = {
      days: document.getElementById('cd-days'),
      hours: document.getElementById('cd-hours'),
      minutes: document.getElementById('cd-minutes'),
      seconds: document.getElementById('cd-seconds'),
    };
    if (!els.days) return;

    if (diff <= 0) {
      els.days.textContent = '00';
      els.hours.textContent = '00';
      els.minutes.textContent = '00';
      els.seconds.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    els.days.textContent = String(days).padStart(2, '0');
    els.hours.textContent = String(hours).padStart(2, '0');
    els.minutes.textContent = String(minutes).padStart(2, '0');
    els.seconds.textContent = String(seconds).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ===========================================================
     3. MENU: fundo ao rolar + menu hambúrguer + fechar ao clicar
     =========================================================== */
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  function onScrollHeader() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ===========================================================
     4. ANIMAÇÃO DE ENTRADA AO ROLAR (scroll reveal)
     =========================================================== */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ===========================================================
     5. GALERIA — LIGHTBOX
     =========================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Foto ampliada';
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add('show'));
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(() => { lightbox.hidden = true; }, 350);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const full = item.getAttribute('data-full');
      const img = item.querySelector('img');
      openLightbox(full, img ? img.alt : '');
    });
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

  /* ===========================================================
     6. FORMULÁRIO DE CONFIRMAÇÃO DE PRESENÇA (RSVP)
     Veja instruções completas no comentário do index.html e no LEIA-ME.md
     =========================================================== */
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSuccess = document.getElementById('rsvp-success');

  async function handleRSVP(event) {
    event.preventDefault();

    if (!rsvpForm.checkValidity()) {
      rsvpForm.reportValidity();
      return;
    }

    const actionUrl = rsvpForm.getAttribute('action') || '';
    const isConfigured = actionUrl.includes('formspree.io') && !actionUrl.includes('SEU_CODIGO_AQUI');

    if (isConfigured) {
      // Envia de fato para o Formspree (ou serviço equivalente) via fetch,
      // sem recarregar a página.
      try {
        const formData = new FormData(rsvpForm);
        const response = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' },
        });
        if (!response.ok) throw new Error('Falha no envio');
        showRsvpSuccess();
      } catch (err) {
        alert('Não foi possível enviar sua confirmação agora. Tente novamente em instantes.');
      }
    } else {
      // MODO DEMONSTRAÇÃO: nenhum serviço configurado ainda.
      // Troque o "action" do formulário no index.html pelo endpoint do
      // Formspree (ou implemente a integração com Google Forms aqui)
      // para que as respostas sejam realmente recebidas.
      console.info('[RSVP] Formulário em modo de demonstração — configure o endpoint em index.html.');
      showRsvpSuccess();
    }
  }

  function showRsvpSuccess() {
    rsvpForm.hidden = true;
    rsvpSuccess.hidden = false;
    rsvpSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (rsvpForm) rsvpForm.addEventListener('submit', handleRSVP);

  /* ===========================================================
     7. MÚSICA DE FUNDO (desativada por padrão, sem autoplay)
     =========================================================== */
  const musicToggle = document.getElementById('music-toggle');
  const bgMusic = document.getElementById('bg-music');
  let musicPlaying = false;

  musicToggle.addEventListener('click', () => {
    if (!bgMusic.src && !bgMusic.currentSrc) {
      // Sem arquivo de música configurado — evita erro silencioso no console
    }
    if (musicPlaying) {
      bgMusic.pause();
      musicPlaying = false;
    } else {
      bgMusic.play().catch(() => {
        console.info('[Música] Adicione um arquivo em /audio/musica.mp3 para habilitar a música de fundo.');
      });
      musicPlaying = true;
    }
    musicToggle.classList.toggle('playing', musicPlaying);
    musicToggle.setAttribute('aria-pressed', String(musicPlaying));
    musicToggle.setAttribute('aria-label', musicPlaying ? 'Pausar música de fundo' : 'Ativar música de fundo');
  });

  /* ===========================================================
     8. BOTÃO VOLTAR AO TOPO
     =========================================================== */
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 700);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===========================================================
     9. PARTÍCULAS ROMÂNTICAS (sutis, geradas via JS)
     =========================================================== */
  const particlesContainer = document.getElementById('particles');
  const PARTICLE_COUNT = window.innerWidth < 640 ? 8 : 14;
  const petalSymbols = ['♥', '✦', '❀'];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = petalSymbols[i % petalSymbols.length];
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
    petal.style.animationDuration = (14 + Math.random() * 12) + 's';
    petal.style.animationDelay = (Math.random() * 16) + 's';
    petal.style.fontSize = (10 + Math.random() * 8) + 'px';
    particlesContainer.appendChild(petal);
  }

});
