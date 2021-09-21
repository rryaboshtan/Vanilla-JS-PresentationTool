class Controls extends HTMLElement {
   constructor() {
      super();
      this.controlRef = null;
      this.deck = null;
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
      this.controlRef.first.addEventListener('click', () => this.deck.jumpTo(0));
      this.controlRef.prev.addEventListener('click', () => this.deck.previous());
      this.controlRef.next.addEventListener('click', () => this.deck.next());
      this.controlRef.last.addEventListener('click', () => this.deck.jumpTo(this.deck.totalSlides - 1));
      this.refreshState();
   }

   static get observedAttributes() {
      return ['deck'];
   }

   async attributeChangedCallback(attrName, oldVal, newVal) {
      if (attrName === 'deck')
         if (oldVal !== newVal) {
            this.deck = document.getElementById(newVal);
            this.deck.addEventListener('slideschanged', () => this.refreshState());
         }
   }

   refreshState() {
      if (!this.deck) {
         throw new Error('Controls: deck variable is not exist or equal to null');
      }
      const next = this.deck.hasNext;
      const prev = this.deck.hasPrevious;
      this.controlRef.first.disabled = !prev;
      this.controlRef.prev.disabled = !prev;
      this.controlRef.next.disabled = !next;
      this.controlRef.last.disabled = !next;
      this.controlRef.pos.innerText = `${this.deck.currentIndex + 1} / ${this.deck.totalSlides}`;
   }
}

export const registerControls = () => customElements.define('slide-controls', Controls);
