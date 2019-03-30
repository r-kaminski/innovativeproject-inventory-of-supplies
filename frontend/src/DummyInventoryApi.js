import { getToken, API_URL } from './DummyAuth';

export const getItems = async () => {
    let token = await getToken();
    try{
        let response = await fetch(
            `${API_URL}/api/supplies/`, {
                headers: new Headers({
                    'Authorization': `JWT ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                })
            }
        );

        let reponseJSON = await response.json();
        //console.log(reponseJSON);
        return reponseJSON;
    }catch(err){
        console.error(err);
    }
}

export const insertItem = async (item) => {
    let token = await getToken();
    let headers = new Headers({
        'Authorization': `JWT ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });

    try{
        let response = await fetch(
            `${API_URL}/api/supplies/`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(item)
            }
        );

        let reponseJSON = response.json();
        return reponseJSON;
    }catch(err){
        console.error(err);
    }
}

export const deleteItem = async (itemId) => {
    let token = await getToken();
    let headers = new Headers({
        'Authorization': `JWT ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });

    try{
        let response = await fetch(
            `${API_URL}/api/supplies/${itemId}`, {
                method: 'DELETE',
                headers: headers,
            }
        );

        let reponseJSON = response.json();
        return reponseJSON;
    }catch(err){
        console.error(err);
    }
}

export const partialUpdateItem = async (itemId, itemBody) => {
    console.log("partialUpdate");
    let token = await getToken();
    
    let headers = new Headers({
        'Authorization': `JWT ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });
    
    console.log(itemBody)

    try{
        let response = await fetch(
            `${API_URL}/api/supplies/${itemId}/`, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(itemBody)
            }
        );

        console.log("tag");
        //let reponseJSON = await response.json();

        console.log(response);
        return response;
    }catch(err){
        console.log("partialUpdate catch")
        console.error(err);
    }
}