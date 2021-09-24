export default class Animator {
   constructor() {
      this._transitioning = false;
      this._firstStepAnim = 'first-step-anim';
      this.secondStepAnim = 'second-step-anim';
   }

   get transitioning() {
      return this._transitioning;
   }

   // get animationDone() {
   //     return !!
   // }

   stepByStepAnimation(htmlElemName, callback, stepAnimClass) {
      this._transitioning = true;

      const animationEnd = () => {
         htmlElemName.removeEventListener('animationend', animationEnd);
         htmlElemName.classList.remove(stepAnimClass);
         this._transitioning = false;
         callback();
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
