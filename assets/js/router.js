/**
 * Handles routing for the app
 */
class Router {
   constructor() {
      /**
       * @property {HTMLDivElement} _eventSource the div used to generate events
       */
      this._eventSource = document.createElement('div');

      /**
       * @property {CustomEvent} _routeChanged
       */
      this._routeChanged = new CustomEvent('routechanged', {
         bubbles: true,
         cancelable: false,
      });

      /**
       * @property {string} _urlHash see window.location.hash
       */
      this._urlHash = null;

      window.addEventListener('popstate', () => {
         if (this.getUrlHash() !== this._urlHash) {
            this._urlHash = this.getUrlHash();
            this.eventSource.dispatchEvent(this._routeChanged);
         }
      });
   }

   /**
    * @returns {HTMLDivElement}
    */
   get eventSource() {
      return this._eventSource;
   }

   /**
    * Set the url hash number
    * @param {string} _urlHash
    */
   setUrlHash(_urlHash) {
      window.location.hash = _urlHash;
      this._urlHash = _urlHash;
   }

   /**
    * @returns {string}
    */
   getUrlHash() {
      return window.location.hash.substr(1);
   }
}

export default Router;
