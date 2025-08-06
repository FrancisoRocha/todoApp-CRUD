import html from './app.html?raw';
import { renderDate } from './modules/date-manager';
import { renderTodos } from './modules/render-todos';
import { getTodos } from './use-cases/get-todo-render';

const elementsIDs = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    Destroy: '.destroy',
    Edit: '.edit',
    TodoFilter: '.filtro',
    PendingCount: '.pending',
    Fill: '.fill',
    Value: '.value',
}

export const App = ( elemetentID ) => {

    //RENDER THE App Todos
    const displayTodos = async() => {
        try{
            const todos = await getTodos();
            renderTodos(elementsIDs.TodoList, todos);
            renderDate();
        } catch(error){
            console.log('Error rendering Todos: ', error);
        }
    }

    //CUANDO SE LLAMA LA FUNCION App()
    (() => {
        // RENDERIZADO DE LA APP
         const app = document.createElement('div');
         app.innerHTML = html;
         document.querySelector(elemetentID).append(app);
         // LLAMADA DE LA RENDERIZACION DE LA FECHA
         displayTodos();
    })();

    //REFERENCIA AL HTML
    const newTaskInput = document.querySelector(elementsIDs.newTodoInput);
    const todoList = document.querySelector(elementsIDs.TodoList);
    const fillters = document.querySelector(elementsIDs.TodoFilter);
    const fillBar = document.querySelector(elementsIDs.Fill);
    const valueBar = document.querySelector(elementsIDs.Value);
    const pendingCount = document.querySelector(elementsIDs.PendingCount);
    const editButton = document.querySelector(elementsIDs.Edit);
    const destroyButton = document.querySelector(elementsIDs.Destroy);
}
