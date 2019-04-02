import {SecureStore} from "expo"
import {API_URL} from "../api";


export const refreshToken = async (token) => {

    try {
        console.log('token in refres ', token);
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
            // throw response;
            // return Promise.reject(response)
            return false;
        } else {
            let responseJson = await response.json();
            console.log(response, responseJson)
            responseJson.token && await SecureStore.setItemAsync('secure_token', responseJson.token)
            return true;
        }
    } catch (error) {
        console.error(error);
    }

    // fetch(
    //         `${API_URL}/obtain-token/`, {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //
    //             body: JSON.stringify({username: login, password: password})
    //         }
    //     ).then(async (res) => {
    //         console.log("res ", res)
    //         await SecureStore.setItemAsync('secure_token', res.json().token)
    //     }
    // ).error((err) => console.log("błąd: ", err))
}


export const getToken = async () => {
    const token = await SecureStore.getItemAsync('secure_token');
    return token
}

export const autoLogin = async () => {
    const token = await SecureStore.getItemAsync('secure_token');
    if (token) {
        let newToken = null;
        return refreshToken(token).then(async (res) => {
            newToken = res
            await SecureStore.setItemAsync('secure_token', newToken)
            return true;
        })
    }
}

export const clearSession = async () => {
    try {
        await SecureStore.deleteItemAsync('secure_token');
        return true;
    } catch (exception) {
        return false;
    }
}