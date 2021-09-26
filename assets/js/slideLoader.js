import Slide from './slide.js';

async function loadSlide(slideName) {
   const response = await fetch(`./assets/slides/${slideName}.html`);
   const slide = await response.text();
   console.log('slide = ', slide);
 
   return new Slide(slide);
}

export default async function loadSlides(start) {
   let next = start;
   const slides = [];
   const cycle = {};
   while (next) {

      const nextSlide = await loadSlide(next);

      console.log('nextSlide =', nextSlide);
      console.log('next =', next);
      if (!cycle[next]) {
         const nextSlide = await loadSlide(next);
         slides.push(nextSlide);
         // cycle[nextSlide.title] = nextSlide;
         next = nextSlide.nextSlideName;
         console.log('nextSlideName = ', next);
      } else {
         break;
      }
   }
   console.log('slides = ', slides);
   return slides;
}
