export const API_URL = 'http://localhost';

export const obtainToken = async () => {
    try {
        let response = await fetch(
            `${API_URL}/obtain-token/`, {
                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({username: 'admin', password: 'admin'})
            }
        );

        let responseJSON = await response.json();
        await sessionStorage.setItem('secure_token', responseJSON.token)

        return responseJSON.token;
    } catch (error) {
        console.error(error);
    }
}

export const refreshToken = async (token) => {
    try {
        let response = await fetch(
            `${API_URL}/refresh-token/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: token})
            }
        );
        let responseJson = await response.json();
        return responseJson.token;
    } catch (error) {
        console.error(error);
    }
};

export const getToken = async () => {
    let token = sessionStorage.getItem('secure_token');
    try{
        
        if(token == null || token == "undefined"){
            token = await obtainToken();
        }else{
            token = await refreshToken(token);
            sessionStorage.setItem('secure_token', token);
        }
        return token;
    }catch(error){
        console.error(error);
    }
}