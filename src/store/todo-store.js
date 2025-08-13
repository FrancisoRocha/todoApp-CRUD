import { Todo } from "../todos/models/todo.models"
import { deleteTodos } from "../todos/use-cases/delete-todo-render"
import { getTodos as getTodosFromaApi } from "../todos/use-cases/get-todo-render"
import { patchTodo } from "../todos/use-cases/patch-todo-render"
import { postTodo } from "../todos/use-cases/post-todo-render"
import { putTodo } from "../todos/use-cases/put-todo-render"

// CREATE FILTER
export const Filters = {
    All: 'all',
    Pending: 'pending',
    Completed: 'completed'
}

//CREATE STATE TODO
const state = {
    todo: [],
    filter: Filters.All,
}
// INITIALIZE STORE
const initStore = async() => {
    console.log('InitStore 🥑')
    await loadStore();
}

const loadStore = async() => {

    try{
        // Clear existing todos first
        state.todo = [];
        const todosFromApi = await getTodosFromaApi();
        state.todo = todosFromApi || [];
        console.log('Todos successfully loaded', state.todo);
    } catch(error){
        console.log(error);
        // If API fails, keep empty array
        state.todo = [];
    }

}

const saveTodoLocalStorage = () => {
    // Removed localStorage functionality to prevent state conflicts
    // All data persistence is handled by the server API
}

//CREATE FUNCTION THE FILTER
const getTodos = ( filter = Filters.All ) => {

    switch(filter){
        case Filters.All:
            return[...state.todo];
        case Filters.Pending:
            return state.todo.filter(todo => !todo.completed);
        case Filters.Completed:
            return state.todo.filter(todo => todo.completed);
        default:
            throw new Error(`Option ${filter} is not valid`);
    }
}

const addTodo = async( description ) => {
    try{
        const todoObj = new Todo(description);
        const newTodo = await postTodo(todoObj);
        if(newTodo) {
            state.todo.push(newTodo);
        }
        // saveTodoLocalStorage(); // Removed to prevent conflicts
    }catch(error){
        console.log(error)
    }
}

const toggleTodo = async(todoId) => {

    try{
        let todoToUpdate = null;

        state.todo = state.todo.map(todos => {
            if(todos.id === todoId){
                todos.completed = !todos.completed;
                todoToUpdate = todos;
            }
            return todos;
        })

        if(todoToUpdate) {
            await patchTodo(todoToUpdate);
            // saveTodoLocalStorage(); // Removed to prevent conflicts
        }
    }catch(error){
        console.log(error)
    }

}

//UPDATE TODO
const updateTodo = async(todoId, newTitle) => {

    try{

        let todoToUpdate = state.todo.find(todo => todo.id === todoId);

        if(!todoToUpdate) {
            throw new Error('Todo not found');
        }

        // Update the title property (not description)
        todoToUpdate.title = newTitle;

        // Update todo on server
        await putTodo(todoToUpdate);
        // saveTodoLocalStorage(); // Removed to prevent conflicts

        return todoToUpdate;

    }catch(error){
        console.error('Error updating todo:', error);
        throw error;
    }

}

const deleteTodo = async(todoId) => {
    try{

        let todoToDelete = state.todo.find(todo => todo.id === todoId);

        if(!todoToDelete){
            throw new Error('Todo not found');
        }

        await deleteTodos(todoToDelete.id);

        // Update local state by removing the deleted todo
        state.todo = state.todo.filter(todo => todo.id !== todoId);

        // saveTodoLocalStorage(); // Removed to prevent conflicts

    }catch(error){
        console.log(error)
        throw new Error(error)
    }
}

const deleteCompleted = async() => {

    try{

        let deleteCompletedTodos = state.todo.filter(todo => todo.completed);

        if(deleteCompletedTodos.length === 0) {
            return; // No completed todos to delete
        }

        // Delete each completed todo individually
        for(const todo of deleteCompletedTodos) {
            await deleteTodos(todo.id);
        }

        // Update local state by removing completed todos
        state.todo = state.todo.filter(todo => !todo.completed);

        // saveTodoLocalStorage(); // Removed to prevent conflicts

    }catch(error){
        console.log(error)
        throw new Error(error)
    }

}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    // saveTodoLocalStorage(); // Removed to prevent conflicts
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore,
    addTodo,
    getTodos,
    toggleTodo,
    updateTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter
}
