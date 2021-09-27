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
         console.error('indexes = ', indexes);
         let values = script.innerHTML.match(/'[a-zA-Z]+'/g);
         console.error('values = ', values);
         values = values.map((value) => value.slice(1, -1));
         console.error('values = ', values);

         
         ul.innerHTML = '';
         console.error('ul = ', ul);

         for (let i = 0; i < values.length; i++) {
            ul.innerHTML += `<li>${indexes[i]} &mdash; ${values[i]} </li>`;
         }
         console.error('ul = ', ul);
    }
}