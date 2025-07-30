import html from './app.html?raw';

const ElementsIDs = {

    //DATE AND MONTH
    Day: '.title-date',
    Month: '.title-month',

    //PROGRESS
    Fill: '.fill',
    Value: '.value',

    //TODO LIST
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    Destroy: '.destroy',
    Edit: '.edit',
    TodoFilters: '.filtro',
    PendingCount: '.count', 


}

export const App = ( elementsId ) => {

    // Cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        //RENDERIZA EL HTML DEL TODO-APP
        document.querySelector( elementsId ).append( app );
    })();


}

