export default class Slide {
   constructor(text) {
      this.text = text;
      this._html = document.createElement('div');
      this._html.innerHTML = text;
      this._title = this._html.querySelectorAll('title');
      if (this._title && this._title.length) {
         this._title = this._title[0].innerText;
      }

      console.log('this.title = ', this._title);
      const nextSlides = this._html.querySelectorAll('nextslide');
      console.log('nextSlides.length = ', nextSlides.length);
      console.log('this._html = ', this._html);

      if (nextSlides.length) {
         this._nextSlideName = nextSlides[0].innerText;
      } else {
         this._nextSlideName = null;
      }
   }

   get title() {
      return this._title;
   }

   get html() {
      return this._html.innerHTML;
   }

   get nextSlideName() {
      return this._nextSlideName;
   }
}
