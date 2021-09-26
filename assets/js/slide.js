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

      if (this._title && this._title.length) {
         this._title = this._title[0].innerText;
      }

      console.log('this.title = ', this._title);

      const nextSlide = this._html.querySelector('.nextslide');
      // console.log('nextSlides.length = ', nextSlide.length);
      // console.log('this._html = ', this._html);

      if (nextSlide) {
         // nextSlides[0].style.visibility = 'hidden';
         this._nextSlideName = nextSlide.innerText;
      } else {
         this._nextSlideName = null;
      }

      const script = this._html.querySelector('script');
      console.error('script = ', script.innerHTML);
      if (script) {
         this.dataBind(script);
      }
   }

   /**
    * Scans for data-binding and applies the bindings
    * @param {HTMLElement} script 
    */
   dataBind(script) {
       const indexes = script.innerHTML.match(/\d+/g);
       console.error('indexes = ', indexes);
       let values = script.innerHTML.match(/'[a-zA-Z]+'/g);
       console.error('values = ', values);
       values = values.map((value) => value.slice(1, -1));
       console.error('values = ', values);

       const ul = this._html.querySelector('[repeat]');
       ul.innerHTML = '';
       console.error('ul = ', ul);

       for (let i = 0; i < values.length; i++) {
          ul.innerHTML += `<li>${indexes[i]} &mdash; ${values[i]} </li>`;
       }
       console.error('ul = ', ul);
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
