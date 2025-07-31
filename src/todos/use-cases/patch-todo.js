

export const patchTodo = async (id, updates) => {

  try{

    const url = `${import.meta.env.VITE_API_URL}/todos/${id}`;
    const res = await fetch(url, {
      method: "PUT",
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
