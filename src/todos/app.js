import html from './app.html?raw';
import { renderDate } from './modules/date-manager';

export const App = ( elemetentID ) => {

   // RENDERIZADO DE LA APP
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elemetentID).append(app)

    // LLAMADA DE LA RENDERIZACION DE LA FECHA
    renderDate();
}
