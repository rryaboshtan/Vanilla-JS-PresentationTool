export default class Navigator {
   constructor(slides, deck) {
      this.deck = deck;
      this.slides = slides;
      this.jumpTo(0);
   }

   get currentIndex() {
      return this.currentIndex;
   }

   get currentSlide() {
      return this.slides[this.currentIndex];
   }

   get totalSlides() {
      return this.slides.length;
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
         this.deck.innerHTML = this.currentSlide.html;
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
