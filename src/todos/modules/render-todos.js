import { createTodoHtml } from "./create-todo-html";

let element;

/**
 * @param {String} elementsIDs
 * @param {Todo} Todos
 */
export const renderTodos = ( elementId, todos = [] ) => {

    //!TODO: REFERENCE
    if (!element)
        element = document.querySelector(elementId);

    if (!element)
        throw new Error('Element not found');

    element.innerHTML = '';

    todos.forEach(todo => {
        element.append(createTodoHtml(todo))
    })

}
