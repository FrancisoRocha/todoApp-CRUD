import { createTodoHtml } from "../../presentation/create-todo-html";


//METHOD: GET - Obtiene y renderiza todos los todos
export const getTodoRender = async () => {

  try{

    const url = `${import.meta.env.VITE_API_URL}/todos`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    // Limpiar la lista actual
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML = '';

    // Crear elementos HTML para cada todo y agregarlos al DOM
    data.forEach(todo => {
      const todoElement = createTodoHtml(todo);
      todoList.append(todoElement);
    });

    return data;

  } catch(error){
    console.error('Error al cargar los todos:', error);
    return [];
  }

}
