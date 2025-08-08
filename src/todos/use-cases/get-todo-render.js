
//METHOD: GET - GET ALL TODOS
export const getTodos = async() => {

    try{

        const url = '/api/todos';
        console.log(url)
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        return data;

    } catch(error){
        console.log(error)
    }

}
