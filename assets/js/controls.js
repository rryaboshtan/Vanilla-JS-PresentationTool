class Controls extends HTMLElement {
   constructor() {
      super();
      this.controlRef = null;
      this.slideContainer = null;
   }

   async connectedCallback() {
      let template = null;
      try {
         const response = await fetch('/assets/templates/controls.html');
         template = await response.text();
      } catch (e) {
         throw new Error('Controls: fetching /assets/templates/controls.html are impossible');
      }

      console.log('Template = ', template);
      this.innerHTML = '';
      const host = document.createElement('div');
      host.innerHTML = template;
      console.log('host.innerHTML = ', host.innerHTML);
      this.appendChild(host);
      console.log('this = ', this);
      this.controlRef = {
         first: document.getElementById('ctrlFirst'),
         prev: document.getElementById('ctrlPrevious'),
         next: document.getElementById('ctrlNext'),
         last: document.getElementById('ctrlLast'),
         pos: document.getElementById('position'),
      };
      console.log("document.getElementById('ctrlFirst') = ", document.getElementById('ctrlFirst'));
      console.log('this.controlRef.first = ', this.controlRef.first);
      this.controlRef.first.addEventListener('click', () => this.slideContainer.jumpTo(0));
      this.controlRef.prev.addEventListener('click', () => this.slideContainer.previous());
      this.controlRef.next.addEventListener('click', () => this.slideContainer.next());
      this.controlRef.last.addEventListener('click', () => this.slideContainer.jumpTo(this.slideContainer.totalSlides - 1));
      this.refreshState();
   }

   static get observedAttributes() {
      return ['slideContainer'];
   }

   async attributeChangedCallback(attrName, oldVal, newVal) {
      if (attrName === 'slideContainer')
         if (oldVal !== newVal) {
            this.slideContainer = document.getElementById(newVal);
            this.slideContainer.addEventListener('slideschanged', () => this.refreshState());
         }
   }

   refreshState() {
      if (!this.slideContainer) {
         throw new Error('Controls: slideContainer variable is not exist or equal to null');
      }
      const next = this.slideContainer.hasNext;
      const prev = this.slideContainer.hasPrevious;
      this.controlRef.first.disabled = !prev;
      this.controlRef.prev.disabled = !prev;
      this.controlRef.next.disabled = !next;
      this.controlRef.last.disabled = !next;
      this.controlRef.pos.innerText = `${this.slideContainer.currentIndex + 1} / ${this.slideContainer.totalSlides}`;
   }
}

export const registerControls = () => customElements.define('slide-controls', Controls);
