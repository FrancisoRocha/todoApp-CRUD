import todoStores, { Filters } from "../../store/todo-store"

let element;

export const renderPendingTodos = ( elementId ) => {

    if(!element)
        element = document.querySelector(elementId)

    if(!element)
        throw new Error(`Element ${elementId} not found`)

    element.innerHTML = todoStores.getTodos( Filters.Pending ).length
}
