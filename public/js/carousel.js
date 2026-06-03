/* ============================================================
   LUMEO — CAROUSEL JS
   Smooth simultaneous slide-in + slide-out with direction
   ============================================================ */

const slides   = document.querySelectorAll('.carousel-slide');
const dots     = document.querySelectorAll('.dot');
let current    = 0;
let animating  = false;
let autoTimer  = null;

/* ── Core: move from one slide to another ─────────────────── */
function goTo(newIndex, direction) {
  if (animating || newIndex === current) return;
  animating = true;

  const outSlide = slides[current];
  const inSlide  = slides[newIndex];

  // Position the incoming slide off-screen (no transition yet)
  inSlide.style.transition  = 'none';
  inSlide.style.transform   = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
  inSlide.style.opacity     = '1';
  inSlide.style.zIndex      = '2';
  outSlide.style.zIndex     = '1';

  // Force reflow so the browser registers the starting position
  void inSlide.offsetWidth;

  // Now apply smooth transitions to both slides simultaneously
  const DURATION = '0.55s';
  const EASING   = 'cubic-bezier(0.4, 0, 0.2, 1)';

  inSlide.style.transition  = `transform ${DURATION} ${EASING}`;
  outSlide.style.transition = `transform ${DURATION} ${EASING}`;

  // Slide in the new one
  inSlide.style.transform   = 'translateX(0)';
  // Slide out the old one
  outSlide.style.transform  = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';

  // Update dots immediately
  dots.forEach(d => d.classList.remove('active'));
  if (dots[newIndex]) dots[newIndex].classList.add('active');

  // After animation ends, clean up
  inSlide.addEventListener('transitionend', function cleanup() {
    inSlide.removeEventListener('transitionend', cleanup);

    // Reset outgoing slide silently
    outSlide.style.transition = 'none';
    outSlide.style.transform  = 'translateX(100%)';
    outSlide.style.zIndex     = '1';

    current   = newIndex;
    animating = false;
  });
}

/* ── next / prev helpers ──────────────────────────────────── */
function nextSlide() {
  goTo((current + 1) % slides.length, 'next');
}

function prevSlide() {
  goTo((current - 1 + slides.length) % slides.length, 'prev');
}

/* ── plusSlides — called by onclick in the HTML ───────────── */
function plusSlides(n) {
  if (n > 0) nextSlide();
  else       prevSlide();
  resetAutoPlay();
}

/* ── currentSlide — called by dot onclick in the HTML ──────── */
function currentSlide(n) {
  const newIndex  = n - 1;   // HTML uses 1-based index
  const direction = newIndex > current ? 'next' : 'prev';
  goTo(newIndex, direction);
  resetAutoPlay();
}

/* ── Auto-play ────────────────────────────────────────────── */
function startAutoPlay() {
  autoTimer = setInterval(nextSlide, 4000);
}

function resetAutoPlay() {
  clearInterval(autoTimer);
  startAutoPlay();
}

/* ── Initialise ───────────────────────────────────────────── */
function init() {
  // Position all slides off-screen to the right, except slide 0
  slides.forEach((slide, i) => {
    slide.style.transition = 'none';
    slide.style.transform  = i === 0 ? 'translateX(0)' : 'translateX(100%)';
    slide.style.zIndex     = i === 0 ? '2' : '1';
  });

  if (dots[0]) dots[0].classList.add('active');
  startAutoPlay();
}

init();