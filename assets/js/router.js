export default class Router {
   constructor() {
      this._eventSource = document.createElement('div');
      this.routeChanged = new CustomEvent('routechanged', {
         bubbles: true,
         cancelable: false,
      });

      this._urlHash = null;

      window.addEventListener('popstate', () => {
         if (this.getUrlHash() !== this._urlHash) {
            this._urlHash = this.getUrlHash();
            this.eventSource.dispatchEvent(this.routeChanged);
         }
      });
   }

   get eventSource() {
      return this._eventSource;
   }

   setRoute(_urlHash) {
      window.location.hash = _urlHash;
      this._urlHash = _urlHash;
    }
    
    getUrlHash() {
        return window.location.hash.substr(1);
    }
}
