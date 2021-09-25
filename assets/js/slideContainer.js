import loadSlides from './slideLoader.js';
import Router from './router.js';
import Animator from './animator.js';

// constructor(slides, deck) {
class SlideContainer extends HTMLElement {
   constructor() {
      super();
      this._currentIndex = 0;
      this._animator = new Animator();
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

      this.jumpTo(0);
   }

   static get observedAttributes() {
      return ['start'];
   }

   async attributeChangedCallback(attrName, oldVal, newVal) {
      if (attrName === 'start') {
         if (oldVal !== newVal) {
            console.log('newVal = ', newVal);
            this.slides = await loadSlides(newVal);
            console.log('this.slides = ', this.slides);
            this.route = this.router.getRoute();
            console.log('this.route = ', this.route);
            let slide = 0;
            if (this.route) {
               console.log('sdfffffffffffffffffffffffffffff');
               slide = parseInt(this.route) - 1;
            }
            console.log('Slide = ', slide);
            this.jumpTo(slide);
         }
      }
   }
   connectedCallback() {
      // this.style.color = 'red';
      // this.style.border = '1px solid red';
      // this.style.display = 'none';
   }

   get currentIndex() {
      return this._currentIndex;
   }

   get currentSlide() {
      return this.slides ? this.slides[this._currentIndex] : null;
   }

   get totalSlides() {
      return this.slides ? this.slides.length : 0;
   }

   get hasPrevious() {
      return this._currentIndex > 0;
   }

   get hasNext() {
      return this._currentIndex < this.totalSlides - 1;
   }

   jumpTo(slideIdx) {
      if (this._animator.transitioning) {
         return;
      }
      if (slideIdx >= 0 && slideIdx < this.totalSlides) {
         // console.log('|||||||||||||||||||||');
         this._currentIndex = slideIdx;
         // console.log('slideIdx = ', slideIdx);
         // this.deck.innerHTML = this.currentSlide.html;
         this.innerHTML = this.currentSlide.html;
         console.log('this.innerHtml = ', this.innerHTML);
         this.router.setRoute(slideIdx + 1);
         this.route = this.router.getRoute();
         this.dispatchEvent(this.slidesChangedEvent);

         console.log('this = ', this);
         this._animator.stepByStepAnimation(this.querySelector('div'), this._animator.secondStepAnim);
      }
   }

   next() {
      if (this.hasNext) {
         this.jumpTo(this._currentIndex + 1);
         
      }
   }

   previous() {
      if (this.hasPrevious) {
         this.jumpTo(this._currentIndex - 1);
      }
   }
}

export const registerDeck = () => customElements.define('slide-container', SlideContainer);
// export const registerDeck = () => customElements.define('slide-container', slideContainer);
