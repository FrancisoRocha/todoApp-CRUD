
//METHOD POST - CREATE NEW TODO
export const postTodo = async(todoObj) => {

    const { title, id, completed } = todoObj;

    const url = `${import.meta.env.VITE_API_URL}/todos`;
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ title, id, completed }),
        headers: {
            "Content-Type": "application/json"
        },
    })

    const data = await res.json();
    return data
}
