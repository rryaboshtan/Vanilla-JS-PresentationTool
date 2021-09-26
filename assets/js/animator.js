/**
 * @class Animator handles animations and transitions
 * @property {boolean} _transitioning True when animation is in effect
 * @property {string} _firstStepAnim animation class name in the css file
 * @property {string} secondStepAnim the class name in the css file
 */
class Animator {
   constructor() {
      this._transitioning = false;
      this._firstStepAnim = 'first-step-anim';
      this._secondStepAnim = 'second-step-anim';
   }

   /**
    * True when animation is in effect
    * @returns {boolean}
    */
   get transitioning() {
      return this._transitioning;
   }

   get firstStepAnim() {
      return this._firstStepAnim;
   }

   get secondStepAnim() {
      return this._secondStepAnim;
   }

   /**
    * Start first or second step of animation depending on the anim class and whether is callback exists or not
    * @param {HTMLDivElement} htmlElem The div to be animated
    * @param {string} stepAnimClass animation class name in the css file
    * @param {Function} callback Function to call when the animation completes
    */

   stepByStepAnimation(htmlElem, stepAnimClass, callback = null) {
      if (!htmlElem) {
         throw new Error('Animator: you must provide a main div element in every slide html file for correct work');
         //  return;
      }
      this._transitioning = true;

      const animationEnd = () => {
         htmlElem.removeEventListener('animationend', animationEnd);
         htmlElem.classList.remove(stepAnimClass);
         this._transitioning = false;
         if (callback) {
            callback();
         }
      };

      htmlElem.addEventListener('animationend', animationEnd, false);
      htmlElem.classList.add(stepAnimClass);
   }
}
//    secondStepAnim(htmlElem) {
//       this._transitioning = true;

//       const animationEnd = () => {
//          htmlElem.removeEventListener('animationend', animationEnd);
//          htmlElem.classList.remove(this._firstStepAnim);
//          this._transitioning = false;
//          callback();
//       };

//       htmlElem.addEventListener('animationend', animationEnd, false);
//       htmlElem.classList.add(this._firstStepAnim);
//    }

export default Animator;
