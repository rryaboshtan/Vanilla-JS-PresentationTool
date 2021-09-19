export default class Slide {
   constructor(text) {
      this.text = text;
      this.html = document.createElement('div');
      this.html.innerHTML = text;
      this.title = this.html.querySelectorAll('.title')[0].innerText;
      const nextSlides = this.html.querySelectorAll('.nextslide');

      if (nextSlides.length) {
         this.nextSlideName = nextSlides[0].innerText;
      } else {
         this.nextSlideName = null;
      }
   }

   get title() {
      return this.title;
   }

   get html() {
      return this.html;
   }

   get nextSlideName() {
      return this.nextSlideName;
   }
}
