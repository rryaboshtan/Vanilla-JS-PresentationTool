import Slide from './slide.js';

/**
 * Load a single slide
 * @param {string} slideName 
 * @returns {Promise<Slide>} The slide
 */
async function loadSlide(slideName) {
   const response = await fetch(`./assets/slides/${slideName}.html`);
   const slide = await response.text();
 
   return new Slide(slide);
}

/**
 * 
 * @param {string} start The name of the first viewed slide
 * @returns {Promise<Slide[]>} The array of loaded slides
 */
export default async function loadSlides(start) {
   let next = start;
   const slides = [];
   const cycle = {};
   while (next) {

      const nextSlide = await loadSlide(next);

      if (!cycle[next]) {
         const nextSlide = await loadSlide(next);
         slides.push(nextSlide);
         next = nextSlide.nextSlideName;
      } else {
         break;
      }
   }
   return slides;
}