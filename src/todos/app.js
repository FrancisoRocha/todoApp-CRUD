import html from './app.html?raw';
import { renderDate } from './modules/date-manager';
import todoStore, { Filters } from '../store/todo-store';
import { renderTodos } from './modules/render-todos';
import { getTodos } from './use-cases/get-todo-render';
import { renderPendingTodos } from './modules/renderPendingTodos';
import modal from './modules/modal/modal.js';
import { updateProgressBar } from './modules/progresBar/progress-bar.js';
import './modules/progresBar/progress-styles.css';

const elementsIDs = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    Destroy: '.destroy',
    Edit: '.edit',
    TodoFilter: '.filtro',
    PendingCount: '.count',
    Fill: '.fill',
    Value: '.value',
}

export const App = (elemetentID) => {

    //RENDER THE App Todos
    const displayTodos = async () => {
        try {
            const todos = await getTodos();
            renderTodos(elementsIDs.TodoList, todos);
            renderDate();
            updatePendigCount();
            updateProgressBar();
        } catch (error) {
            console.log('Error rendering Todos: ', error);
        }
    }

    const updatePendigCount = () => {
        renderPendingTodos(elementsIDs.PendingCount)
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
    const destroyButton = document.querySelector(elementsIDs.Destroy);

    //EVENTLISTENER

    //INPUT
    newTaskInput.addEventListener('keyup', async(event) => {

        if (event.keyCode !== 13) return;

        const valueInput = event.target.value.trim();

        //SI EL INPUT ESTA VACIO
        if( valueInput.length === 0){
            newTaskInput.classList.add('error');
            newTaskInput.placeholder = 'Enter a task';
            return;
        }

        //SI EL INPUT ES VALIDO
        newTaskInput.classList.remove('error');
        await todoStore.addTodo(valueInput);
        displayTodos();
        event.target.value = '';
    })

    //CHECKBOX TOGGLE AND BUTTON EVENTS
    todoList.addEventListener('click', async(event) => {
        const element = event.target;

        // Check if clicked element is a toggle checkbox, label, or within a todo item
        const isToggle = element.classList.contains('toggle');
        const isLabel = element.tagName === 'LABEL';
        const isView = element.classList.contains('view');
        const isEditButton = element.classList.contains('edit');
        const isDestroyButton = element.classList.contains('destroy');

        // Get the todo ID from the parent li element
        const liElement = element.closest('li');
        const todoId = liElement?.getAttribute('data-id');

        if (!todoId) return;

        // Handle edit button click
        if (isEditButton) {
            const label = liElement.querySelector('label');
            const currentTitle = label?.textContent || '';
            modal.openModal(todoId, currentTitle);
            return;
        }

        // Handle destroy button click
        if (isDestroyButton) {
            // TODO: Implement delete functionality
            console.log('Delete todo:', todoId);
            return;
        }

        // Don't toggle if clicking edit or destroy buttons
        if (isEditButton || isDestroyButton) return;

        // Only proceed if clicking on toggle, label, or view area
        if (!isToggle && !isLabel && !isView) return;

        // Toggle the todo status
        await todoStore.toggleTodo(todoId);
        displayTodos();
    })

    // Make displayTodos available globally for the modal
    window.todoApp = { displayTodos };

}
