import { Todo } from "../todos/models/todo.models"
import { getTodos as getTodosFromaApi } from "../todos/use-cases/get-todo-render"
import { postTodo } from "../todos/use-cases/post-todo-render"

// CREATE FILTER
export const Filters = {
    All: 'all',
    Pending: 'pending',
    Completed: 'completed'
}

//CREATE STATE TODO
const state = {
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
        state.todo = todosFromApi || [];
        console.log('Todos successfully loaded', state.todo);
    } catch(error){
        console.log(error);
    }

}

const saveTodoLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(state))
}

//CREATE FUNCTION THE FILTER
const getTodos = () => {
    throw new Error('Method not implemented.');
}

const addTodo = async( description ) => {
    try{
        const todoObj = new Todo(description);
        const newTodo = await postTodo(todoObj);
        if(newTodo) {
            state.todo.push(newTodo);
        }
        saveTodoLocalStorage();
    }catch(error){
        console.log(error)
    }
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
    initStore,
    addTodo,
}
