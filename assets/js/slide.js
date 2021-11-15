import DataBinding from './dataBinding.js';
export default class Slide {
   /**
    *
    * @param {string} text The content of the slide
    */
   constructor(text) {
      /** @property {HTMLDivElement} _html Wrapper div element for the slide content  */
      this._html = document.createElement('div');

      this._html.innerHTML = text;
      this._html2 = document.createElement('div');
      this._html2.appendChild(this._html);
      this._html = this._html2;

      /**
       * @property {string}
       */
      this._nextSlideName = null;

      /** @property {string} _title title of the slide  */
      this._title = this._html.querySelectorAll('title');

      this._dataBinding = new DataBinding();

      if (this._title && this._title.length) {
         this._title = this._title[0].innerText;
      }

      const nextSlide = this._html.querySelector('.nextslide');

      if (nextSlide) {
         this._nextSlideName = nextSlide.innerText;
      } else {
         this._nextSlideName = null;
      }

      const script = this._html.querySelector('script');
      if (script) {
         const ul = this._html.querySelector('[repeat]');
         this._dataBinding.bind(script, ul);
      }
   }

   /**
    * Scans for data-binding and applies the bindings
    * @param {HTMLElement} script
    */
   // dataBind(script) {}

   /**
    * The slide title
    * @returns {string} The slide title
    */
   get title() {
      return this._title;
   }

   /**
    *  HTML content of the slide
    * @returns {HTMLDivElement} html content of the slide
    */
   get html() {
      return this._html.innerHTML;
   }

   /**
    * @returns {string} The name of the next slide (filename without the .html extension)
    */
   get nextSlideName() {
      return this._nextSlideName;
   }
}
