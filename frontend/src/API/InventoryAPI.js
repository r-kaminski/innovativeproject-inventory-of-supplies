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

        return response;
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

        return response;
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

        return response;
    }catch(err){
        console.error(err);
    }
}

export const partialUpdateItem = async (itemId, itemBody) => {
    let token = await getToken();
    
    let headers = new Headers({
        'Authorization': `JWT ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });

    try{
        let response = await fetch(
            `${API_URL}/api/supplies/${itemId}/`, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(itemBody)
            }
        );

        return response;
    }catch(err){
        console.error(err);
    }
}