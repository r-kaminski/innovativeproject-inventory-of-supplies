import { getToken, API_URL } from './DummyAuth';

export const getItems = async () => {
    let token = await getToken();
    try{
        let response = await fetch(
            `${API_URL}/supplies/`, {
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({token : token})
            }
        );

        let reponseJSON = response.json();
        return reponseJSON;
    }catch(err){
        console.error(err);
    }
}