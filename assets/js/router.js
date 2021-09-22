export default class Router {
   constructor() {
      this._eventSource = document.createElement('div');
      this.routeChanged = new CustomEvent('routechanged', {
         bubbles: true,
         cancelable: false,
      });

      this.route = null;

      window.addEventListener('popstate', () => {
         if (this.getRoute() !== this.route) {
            this.route = this.getRoute();
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
    
    getRoute() {
        return window.location.hash.substr(1);
    }
}
