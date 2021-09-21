import Slide from './slide.js';

async function loadSlide(slideName) {
   const response = await fetch(`./assets/slides/${slideName}.html`);
   const slide = await response.text();
   return new Slide(slide);
}

export default async function loadSlides(start) {
   let next = start;
   const slides = [];
   const cycle = {};
   while (next) {
      const nextSlide = await loadSlide(next);
      if (!cycle[next]) {
         const nextSlide = await loadSlide(next);
         slides.push(nextSlide);
         // cycle[nextSlide.title] = nextSlide;
         next = nextSlide.nextSlide;
       }
      else {
          break;
       }
    }
    return slides;
}