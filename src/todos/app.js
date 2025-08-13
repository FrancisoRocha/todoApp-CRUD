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
    Destroy: '.clear-completed',
    TodoFilter: '.filtro',
    PendingCount: '.count',
    Fill: '.fill',
    Value: '.value',
}

export const App = (elemetentID) => {

    //RENDER THE App Todos
    const displayTodos = async () => {
        try {
            const currentFilter = todoStore.getCurrentFilter();
            const todos = todoStore.getTodos(currentFilter);
            renderTodos(elementsIDs.TodoList, todos);
            renderDate();
            updatePendigCount();
            updateProgressBar();
            updateClearButtonState();
        } catch (error) {
            console.log('Error rendering Todos: ', error);
        }
    }

    const updatePendigCount = () => {
        renderPendingTodos(elementsIDs.PendingCount)
    }

    const updateClearButtonState = () => {
        const completedTodos = todoStore.getTodos().filter(todo => todo.completed);
        clearCompletedTodos.disabled = completedTodos.length === 0;
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
    const filtersList = document.querySelectorAll(elementsIDs.TodoFilter);
    const clearCompletedTodos = document.querySelector(elementsIDs.Destroy);

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
            const { default: swal } = await import('sweetalert');

                const willDelete = await swal({
                    title: "¿Estás seguro?",
                    text: "Una vez eliminado, no podrás recuperar este todo!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                });

                if (willDelete) {
                    await todoStore.deleteTodo(todoId);
                    swal("¡Todo eliminado correctamente!", {
                        icon: "success",
                    });
                }
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

    //CLEAR COMPLETED TODOS
    clearCompletedTodos.addEventListener('click', async() => {
        const { default: swal } = await import('sweetalert');

        const willDelete = await swal({
            title: "¿Estás seguro?",
            text: "Esto eliminará todos los Todos completados!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });

        if (willDelete) {
            await todoStore.deleteCompleted();
            displayTodos();
            swal("¡Todos completados eliminados!", {
                icon: "success",
            });
        }
    });

    // Make displayTodos available globally for the modal
    window.todoApp = { displayTodos };


    //Filter TODOS
    filtersList.forEach( element => {
        element.addEventListener('click', async(event) => {
            event.preventDefault();

            filtersList.forEach(el => el.classList.remove('selected'));
            event.target.classList.add('selected');

            switch(event.target.dataset.filter){
                case 'all':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'pending':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'completed':
                    todoStore.setFilter(Filters.Completed);
                    break;
                default:
                    todoStore.setFilter(Filters.All);
                    break;
            }
            displayTodos();

        })
    })

}
