/**
 * Used for bind ul list with the list in script tag
 */
export default class DataBinding {

    /**
     * 
     * @param {HTMLElement} script script with list binding data 
     * @param {HTMLElement} ul the list in slide html code which we should bind
     */
    bind(script, ul) {
         const indexes = script.innerHTML.match(/\d+/g);
         let values = script.innerHTML.match(/'[a-zA-Z]+'/g);
         values = values.map((value) => value.slice(1, -1));
         
         ul.innerHTML = '';

         for (let i = 0; i < values.length; i++) {
            ul.innerHTML += `<li>${indexes[i]} &mdash; ${values[i]} </li>`;
         }
    }
}