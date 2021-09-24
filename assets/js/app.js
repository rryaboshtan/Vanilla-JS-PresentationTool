// import getJson from './jsonLoader.js';
import { registerDeck } from './slideContainer.js';
import { registerControls } from './controls.js';

const state = {
   manifest: {},
};

const app = async () => {
   // state.deck = document.querySelector(main);

   // state.manifest = await getJson("/assets/slides/manifest.json");

   registerDeck();
   registerControls();
};

app();
