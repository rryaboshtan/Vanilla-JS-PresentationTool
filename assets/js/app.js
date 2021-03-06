import { registerDeck } from './slideContainer.js';
import { registerControls } from './controls.js';

const state = {
   manifest: {},
};

const app = async () => {
   registerDeck();
   registerControls();
};

app();

window.addEventListener('load', () => {
   if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/pwa.js', { scope: '/' }).then(
         register => {
            console.error('Service worker registered: ', register);
         },
         err => console.error('Service worker ragistration failed', err)
      );
   }
});
