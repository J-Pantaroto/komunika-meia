// Scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Slider da equipe com autoplay suave + controle manual
const slider = document.querySelector('.team-slider');
const btnPrev = document.querySelector('.btn-komunika-prev');
const btnNext = document.querySelector('.btn-komunika-next');
let autoSlide;

if (slider && btnPrev && btnNext) {
  const slideStep = 320; // distância por vez

  const smoothScroll = (distance) => {
    slider.scrollBy({
      left: distance,
      behavior: 'smooth'
    });
  };

  btnPrev.addEventListener('click', () => {
    smoothScroll(-slideStep);
    resetAutoSlide();
  });

  btnNext.addEventListener('click', () => {
    smoothScroll(slideStep);
    resetAutoSlide();
  });

  const startAutoSlide = () => {
    autoSlide = setInterval(() => {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        smoothScroll(slideStep / 2); // movimento mais curto e constante
      }
    }, 1500); // quanto menor, mais suave (tipo um "scroll contínuo")
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlide);
    startAutoSlide();
  };

  startAutoSlide();
}


