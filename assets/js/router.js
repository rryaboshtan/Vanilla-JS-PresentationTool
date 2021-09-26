export default class Router {
   constructor() {
      this._eventSource = document.createElement('div');
      this.routeChanged = new CustomEvent('routechanged', {
         bubbles: true,
         cancelable: false,
      });

      this.route = null;

      window.addEventListener('popstate', () => {
         if (this.getUrlHash() !== this.route) {
            this.route = this.getUrlHash();
            this.eventSource.dispatchEvent(this.routeChanged);
         }
      });
   }

   get eventSource() {
      return this._eventSource;
   }

   setRoute(route) {
      window.location.hash = route;
      this.route = route;
    }
    
    getUrlHash() {
        return window.location.hash.substr(1);
    }
}
