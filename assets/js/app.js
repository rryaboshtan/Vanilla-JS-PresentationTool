import getJson from './jsonLoader';

const state = {
   manifest: {},
};

const app = async () => {
    state.deck = document.querySelector(main);

    state.manifest = await getJson("assets/slides/manifest.json");

    
}