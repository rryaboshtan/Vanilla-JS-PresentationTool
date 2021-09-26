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

      /** @property {string} _title title of the slide  */
      this._title = this._html.querySelectorAll('title');

      if (this._title && this._title.length) {
         this._title = this._title[0].innerText;
      }

      console.log('this.title = ', this._title);

      const nextSlides = this._html.querySelectorAll('.nextslide');
      console.log('nextSlides.length = ', nextSlides.length);
      console.log('this._html = ', this._html);

      if (nextSlides.length) {
         // nextSlides[0].style.visibility = 'hidden';
         this._nextSlideName = nextSlides[0].innerText;
      } else {
         this._nextSlideName = null;
      }
   }
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
   // get html() {
   //    return '<div>' + this._html.innerHTML + '</div>';
   // }

   /**
    * @returns {string} The name of the next slide (filename without the .html extension)
    */
   get nextSlideName() {
      return this._nextSlideName;
   }
}
