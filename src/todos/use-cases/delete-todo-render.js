

export const deleteTodos = async(id) => {

    try{
        const url = `${import.meta.env.VITE_API_URL}/todos/${id}`
        const res = await fetch(url, {
            method: 'DELETE'
        })

        if(!res.ok){
            throw new Error(`Failed to delete todo: ${res.status}`)
        }

        const data = await res.json()
        return data

    }catch(error){
        console.log(error);
        throw error;
    }

}
