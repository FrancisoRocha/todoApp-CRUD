import { Todo } from "../todos/models/todo.models"
import { getTodos as getTodosFromaApi } from "../todos/use-cases/get-todo-render"

// CREATE FILTER
const Filters = {
    All: 'all',
    Pending: 'pending',
    Completed: 'completed'
}

//CREATE STATE TODO
const State = {
    todo: [
        new Todo('Jugar con mi mascota'),
        new Todo('Comprar comida'),
        new Todo('Reservar el hotel para el viaje'),
    ],
    filter: Filters.All,
}
// INITIALIZE STORE
const initStore = async() => {
    console.log('InitStore 🥑')
    await loadStore();
}

const loadStore = async() => {

    try{
        const todosFromApi = await getTodosFromaApi();
        State.todo = todosFromApi || [];
        console.log('Todos successfully loaded', State.todo);
    } catch(error){
        console.log(error);
    }

}

const saveTodoLocalStorage = () => {
    throw new Error('Method not implemented.');
}

//CREATE FUNCTION THE FILTER
const getTodos = () => {
    throw new Error('Method not implemented.');
}

const addTodo = () => {
    throw new Error('Method not implemented.');
}

//UPDATE TODO
const updateTodo = () => {
    throw new Error('Method not implemented.');
}

const deleteTodo = () => {
    throw new Error('Method not implemented.');
}

const deleteCompleted = () => {
    throw new Error('Method not implemented.');
}

const setFilter = () => {
    throw new Error('Method not implemented.');
}

const getCurrentFilter = () => {
    throw new Error('Method not implemented.');
}

export default {
    initStore
}
