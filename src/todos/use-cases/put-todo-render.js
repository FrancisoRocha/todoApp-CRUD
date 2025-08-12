export const putTodo = async(todo) => {

    if (!todo || !todo.id || !todo.title) {
        throw new Error('Invalid todo object: id and title are required');
    }

    const { id, title } = todo;

    try {

        const url = `/api/todos/${id}`;
        const res = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({ title }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.error('Error updating todo title:', error);
        throw error;
    }

}