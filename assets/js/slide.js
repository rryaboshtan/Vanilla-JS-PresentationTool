export default class Slide {
   constructor(text) {
      this.text = text;
      this._html = document.createElement('div');
      this.html.innerHTML = text;
      this._title = this.html.querySelectorAll('.title');
      if (this.title && this.title.length) {
         this.title = this.title[0].innerText;
      }
      
      const nextSlides = this.html.querySelectorAll('.nextslide');

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
      return this._html;
   }

   get nextSlideName() {
      return this._nextSlideName;
   }
}
