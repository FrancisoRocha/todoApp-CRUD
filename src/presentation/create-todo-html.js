

export const createTodoHtml = ( todo ) => {

  //SI EXISTE EL TODO
  if (!todo) throw new Error('Todo is required');

  const { id, title } = todo;

  const html =
    `
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
            <label>${title}</label>
            <button class="edit" data-id="${id}"></button>
            <button class="destroy" data-id="${id}"></button>
        </div>
    `;

  const element = document.createElement('li');
  element.innerHTML = html;
  element.setAttribute('data-id', id);

  //SI ESTA FINALIZADO
  if (todo.completed) {
    element.classList.add('completed');
  }

  return element;

}
