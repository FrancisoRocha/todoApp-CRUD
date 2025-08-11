

export const patchTodo = async(toggleTodo) => {

    if(!toggleTodo || !toggleTodo.id || typeof toggleTodo.completed !== 'boolean'){
        throw new Error('Invalid input')
    }

    const { id, completed } = toggleTodo

    try{

        const url = `/api/todos/${id}`
        const res = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify({completed}),
            headers: {
                "Content-Type": "application/json"
            },
        })

        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        return data

    }catch(error){
        console.error('Error updating todo:', error);
        throw error;
    }

}
