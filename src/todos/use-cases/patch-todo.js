

export const patchTodo = async (id, updates) => {

  try{

    const url = `/api/todos/${id}`;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(updates),
      headers: {
        'Content-type': 'application/json',
      }
    });

    if(!res.ok){
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json()
    return data;

  }catch(error){
    console.log(error);
  }

}
