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
        let responseJson = await response.json();
        await sessionStorage.setItem('secure_token', responseJson.token)

        return responseJson;
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
        console.log(responseJson)
        return responseJson.token;
    } catch (error) {
        console.error(error);
    }
};

export const getToken = async () => {
    try{
        let token = sessionStorage.getItem('secure_token');
        if(!token){
            token = await obtainToken();
        }else{
            token = await refreshToken(token);
        }
        return token;
    }catch(error){
        console.error(error);
    }
}