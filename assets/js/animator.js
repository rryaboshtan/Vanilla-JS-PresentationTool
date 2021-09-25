export default class Animator {
   constructor() {
      this._transitioning = false;
      this._firstStepAnim = 'first-step-anim';
      this._secondStepAnim = 'second-step-anim';
   }

   get transitioning() {
      return this._transitioning;
   }

   get firstStepAnim() {
      return this._firstStepAnim;
   }

   get secondStepAnim() {
      return this._secondStepAnim;
   }

   stepByStepAnimation(htmlElemName, stepAnimClass, callback = null) {
      if (!htmlElemName) {
         throw new Error('Animator: you must provide a main div element in every slide html file for correct work');
         //  return;
      }
      this._transitioning = true;

      const animationEnd = () => {
         htmlElemName.removeEventListener('animationend', animationEnd);
         htmlElemName.classList.remove(stepAnimClass);
         this._transitioning = false;
         if (callback) {
            callback();
         }
      };

      htmlElemName.addEventListener('animationend', animationEnd, false);
      htmlElemName.classList.add(stepAnimClass);
   }
}
//    secondStepAnim(htmlElemName) {
//       this._transitioning = true;

//       const animationEnd = () => {
//          htmlElemName.removeEventListener('animationend', animationEnd);
//          htmlElemName.classList.remove(this._firstStepAnim);
//          this._transitioning = false;
//          callback();
//       };

//       htmlElemName.addEventListener('animationend', animationEnd, false);
//       htmlElemName.classList.add(this._firstStepAnim);
//    }
