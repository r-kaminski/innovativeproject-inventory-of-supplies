import {SecureStore} from "expo"
import {API_URL} from "../api";


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

export const setHeaders = async (headers) => {
    let newHeaders = {
        ...headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    let token = null;
    return await getToken().then((res) => token = res).then(
        async () => {
            if (token) {
                const headersWithToken = {
                    ...newHeaders,
                    'Authorization': `JWT ${token}`
                };
                return await headersWithToken
            } else {
                return newHeaders;
            }
        }
    )
}


export const signIn = async (login, password) => {
    try {
        let response = await fetch(
            `${API_URL}/obtain-token/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({username: login, password: password})
            }
        );
        if (response.status >= 400) {
            return false;
        } else {
            let responseJson = await response.json();
            responseJson.token && await SecureStore.setItemAsync('secure_token', responseJson.token)
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}


export const getToken = async () => {
    const token = await SecureStore.getItemAsync('secure_token');
    return token;
}

export const autoLogin = async () => {
    const token = await SecureStore.getItemAsync('secure_token');
    if (token) {
        let newToken = null;
        return refreshToken(token).then(async (res) => {
            newToken = await res;
            if(newToken){
                SecureStore.setItemAsync('secure_token', newToken);
                return true;
            }else{
                return false;
            }
        })
    }
}

export const logout = () => {
    SecureStore.setItemAsync('secure_token', "");
}

export const clearSession = async () => {
    try {
        await SecureStore.deleteItemAsync('secure_token');
        return true;
    } catch (exception) {
        return false;
    }
}