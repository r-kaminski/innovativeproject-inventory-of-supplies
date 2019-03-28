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