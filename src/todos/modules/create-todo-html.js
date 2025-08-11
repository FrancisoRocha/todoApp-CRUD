
export const createTodoHtml = (todo) => {

    if(!todo) throw new Error('Todo is required');

    const { completed, id, title } = todo;

    const todoHtml =
        `<div class="view">
            <input class="toggle" type="checkbox" ${completed ? 'checked' : ''}>
            <label>${ title }</label>
            <button class="edit"></button>
            <button class="destroy"></button>
        </div>`

    //CREATE LI ELEMENT
    const liElement = document.createElement('li');
    liElement.innerHTML = todoHtml;
    liElement.setAttribute('data-id', id);

    //IF FINISHED OR COMPLETED
    if(todo.completed)
        liElement.classList.add('completed')

    return liElement;
}
