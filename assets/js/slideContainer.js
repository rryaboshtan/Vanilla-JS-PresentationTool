import loadSlides from './slideLoader.js';
import Router from './router.js';
import Animator from './animator.js';

/**
 * The main class that handles rendering the slide container
 * @property {Animator} _animator Animation helper
 * @property {Router} _router Routing helper
 * @property {string} _route The url hash (see window.location.hash)
 * @property {CustomEvent} slidesChangedEvent 
 */
class SlideContainer extends HTMLElement {
   constructor() {
      super();
      this._currentIndex = 0;
      this._animator = new Animator();
      this.router = new Router();
      this.urlHash = this.router.getUrlHash();
      this.slidesChangedEvent = new CustomEvent('slideschanged', {
         bubbles: true,
         cancelable: false,
      });
      this.router.eventSource.addEventListener('routechanged', () => {
         if (this.urlHash !== this.router.getUrlHash()) {
            this.urlHash = this.router.getUrlHash();
            if (this.urlHash) {
               const slide = parseInt(this.urlHash) - 1;
               this.jumpTo(slide);
            }
         }
      });
      // this.router.eventSource.addEventListener('click', () => console.log('OnClick'));

      // console.error('OnRouteChanged =', this.router.eventSource);

      this.jumpTo(0);
   }

   /**
    * Get the list of observed attributes
    * @returns {string[]}
    */
   static get observedAttributes() {
      return ['start-slide'];
   }

   /**
    * Called when the customizable html element attributes changed
    * @param {string} attrName
    * @param {string} oldVal
    * @param {string} newVal
    */
   async attributeChangedCallback(attrName, oldVal, newVal) {
      if (attrName === 'start-slide' && oldVal !== newVal) {
         {
            console.log('newVal = ', newVal);
            this.slides = await loadSlides(newVal);
            console.log('this.slides = ', this.slides);
            this.urlHash = this.router.getUrlHash();
            console.log('this.urlHash = ', this.urlHash);
            let slide = 0;
            if (this.urlHash) {
               console.log('sdfffffffffffffffffffffffffffff');
               slide = parseInt(this.urlHash) - 1;
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

   /**
    * Current slide index
    * @returns {number}
    */
   get currentIndex() {
      return this._currentIndex;
   }

   /**
    * @returns {Slide}
    */
   get currentSlide() {
      return this.slides ? this.slides[this._currentIndex] : null;
   }

   /**
    * @returns {number}
    */
   get totalSlides() {
      return this.slides ? this.slides.length : 0;
   }

   /**
    * @returns {boolean}
    */
   get hasPrevious() {
      return this._currentIndex > 0;
   }

   /**
    * @returns {boolean}
    */
   get hasNext() {
      return this._currentIndex < this.totalSlides - 1;
   }

   /**
    * Main slide navigation and second step animation
    * @param {number} slideIdx 
    */
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
         this.urlHash = this.router.getUrlHash();
         this.dispatchEvent(this.slidesChangedEvent);

         console.log('this = ', this);
         this._animator.stepByStepAnimation(this.querySelector('div'), this._animator.secondStepAnim);
      }
   }

   /**
    * Goes to next slide and applies first step slide animation
    */
   next() {
      if (this.hasNext) {
         // this.jumpTo(this._currentIndex + 1);
         this._animator.stepByStepAnimation(this.querySelector('div'), this._animator.firstStepAnim, () =>
            this.jumpTo(this._currentIndex + 1)
         );
      }
   }

   /**
    * Move to previous slide, only if it exists
    */
   previous() {
      if (this.hasPrevious) {
         this.jumpTo(this._currentIndex - 1);
      }
   }
}

/**
 * Connect the SlideContainer class with html slide-container element
 */
export const registerDeck = () => customElements.define('slide-container', SlideContainer);
// export const registerDeck = () => customElements.define('slide-container', slideContainer);