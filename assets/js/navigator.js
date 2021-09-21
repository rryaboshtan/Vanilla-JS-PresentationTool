import loadSlides from './slideLoader.js';
import Router from './router.js';

export default class Navigator extends HTMLElement {
   constructor(slides, deck) {
      super();
      this.router = new Router();
      this.route = this.router.getRoute();
      this.slidesChangedEvent = new CustomEvent('slideschanged', {
         bubbles: true,
         cancelable: false,
      });
      this.router.eventSource.addEventListener('routechanged', () => {
         if (this.route !== this.router.getRoute()) {
            this.route = this.router.getRoute();
            if (this.route) {
               const slide = parseInt(this.route) - 1;
               this.jumpTo(slide);
            }
         }
      });

      this.deck = deck;
      this.slides = slides;
      this.jumpTo(0);
   }

   static get observedAttributes() {
      return ['start'];
   }

   async attributeChangedCallback(attrName, oldVal, newVal) {
      if (attrName === 'start') {
         if (oldVal !== newVal) {
            this.slides = await loadSlides(newVal);
            this.route = this.router.getRoute();
            let slide = 0;
            if (this.route) {
               slide = parseInt(this.route) - 1;
            }
            this.jumpTo(slide);
         }
      }
   }
   connectedCallback() {
      setTimeout(() => {
      this.style.backgroundColor = 'red';
      }, 0)
   }

   get currentIndex() {
      return this.currentIndex;
   }

   get currentSlide() {
      return this.slides[this.currentIndex] || null;
   }

   get totalSlides() {
      return this.slides.length || 0;
   }

   get hasPrevious() {
      return this.currentIndex > 0;
   }

   get hasNext() {
      return this.currentIndex < this.totalSlides - 1;
   }

   jumpTo(slideIdx) {
      if (slideIdx >= 0 && slideIdx < this.totalSlides) {
         this.currentIndex = slideIdx;
         // this.deck.innerHTML = this.currentSlide.html;
         this.innerHTML = this.currentSlide.html;
         this.router.setRoute(slideIdx + 1);
         this.route = this.router.getRoute();
         this.dispatchEvent(this.slidesChangedEvent);
      }
   }

   next() {
      if (this.hasNext) {
         this.jumpTo(this.currentIndex + 1);
      }
   }

   previous() {
      if (this.hasPrevious) {
         this.jumpTo(this.currentIndex - 1);
      }
   }
}

export const registerDeck = () => customElements.define('slide-deck', Navigator, {extends: 'div'});
// export const registerDeck = () => customElements.define('slide-deck', Navigator);