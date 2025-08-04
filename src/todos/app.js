import html from './app.html?raw';
<<<<<<< HEAD
import { getTodoRender } from './use-cases/get-todo-render';
import { patchTodo } from './use-cases/patch-todo';
=======
import { renderDate } from './modules/date-manager';
>>>>>>> todoApp

export const App = ( elemetentID ) => {

<<<<<<< HEAD
    //TODO LIST
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    Destroy: '.destroy',
    Edit: '.edit',
    TodoFilters: '.filtro',
    PendingCount: '.count',

=======
   // RENDERIZADO DE LA APP
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elemetentID).append(app)
>>>>>>> todoApp

    // LLAMADA DE LA RENDERIZACION DE LA FECHA
    renderDate();
}
<<<<<<< HEAD

export const App = ( elementsId ) => {

    // Cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        //RENDERIZA EL HTML DEL TODO-APP
        document.querySelector( elementsId ).append( app );
    })();

    // Cargar todos al inicializar la aplicación
    (() => {
        getTodoRender();
    })();

    //REFERENCIA AL HTML DEL TODO-APP
    const todoLi = document.querySelector(ElementsIDs.TodoList);

    //LISTENERS
    todoLi.addEventListener('click', async (event) => {

      // Manejar click en checkbox
      if(event.target.classList.contains('toggle')){

        const todoElement = event.target.closest('[data-id]');
        const todoId = todoElement.getAttribute('data-id');
        const isCompleted = event.target.checked;

        try{

          //ACUALIZAR LA API
          await patchTodo(todoId, { completed: isCompleted });

          //ACTUALIZAR UI
          if(isCompleted){
            todoElement.classList.add('completed');
          } else {
            todoElement.classList.remove('completed');
          }

        } catch(error){
          //REVERTIR ERROR
          event.target.checked = !isCompleted;
          console.log(error);
        }

      }

      // Manejar click en label (alternar completado)
      if(event.target.tagName === 'LABEL'){
        const todoElement = event.target.closest('[data-id]');
        const checkbox = todoElement.querySelector('.toggle');
        
        // Simular click en checkbox
        checkbox.checked = !checkbox.checked;
        
        // Disparar evento change del checkbox
        const changeEvent = new Event('change', { bubbles: true });
        checkbox.dispatchEvent(changeEvent);
        
        // Ejecutar la misma lógica del checkbox
        const todoId = todoElement.getAttribute('data-id');
        const isCompleted = checkbox.checked;

        try{
          await patchTodo(todoId, { completed: isCompleted });

          if(isCompleted){
            todoElement.classList.add('completed');
          } else {
            todoElement.classList.remove('completed');
          }

        } catch(error){
          checkbox.checked = !isCompleted;
          console.log(error);
        }
      }

      // Manejar click en botón edit
      if(event.target.classList.contains('edit')){
        const todoElement = event.target.closest('[data-id]');
        const todoId = todoElement.getAttribute('data-id');
        console.log('Editar todo:', todoId);
        // Aquí puedes agregar la lógica para editar
      }

      // Manejar click en botón destroy
      if(event.target.classList.contains('destroy')){
        const todoElement = event.target.closest('[data-id]');
        const todoId = todoElement.getAttribute('data-id');
        console.log('Eliminar todo:', todoId);
        // Aquí puedes agregar la lógica para eliminar
      }

    });

}
=======
>>>>>>> todoApp
