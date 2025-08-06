
export const createTodoHtml = (todo) => {

    if(!todo) throw new Error('Todo is required');

    const { done, id, title } = todo;

    const todoHtml =
        `<div class="view">
            <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
            <label>${ title }</label>
            <button class="edit"></button>
            <button class="destroy"></button>
        </div>`

    //CREATE LI ELEMENT
    const liElement = document.createElement('li');
    liElement.innerHTML = todoHtml;
    liElement.setAttribute('data-id', id);

    //IF FINISHED OR COMPLETED
    if(todo.done)
        liElement.classList.add('completed')

    return liElement;
}
