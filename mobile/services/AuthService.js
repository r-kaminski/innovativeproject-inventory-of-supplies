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


export const signIn = async () => {
    //logowanie google
    // try {
    //     const result = await Expo.Google.logInAsync({
    //         androidClientId: "837959349595-frmntvqs95o0hiab24hadkhf0jkhffaq.apps.googleusercontent.com",
    //         scopes: ["profile", "email"]
    //     })
    //     if (result.type === "success") {
    //         // await SecureStore.setItemAsync('secure_token', result.accessToken);
    //     } else {
    //         console.log("cancelled")
    //     }
    //     return result;
    //
    // } catch (e) {
    //     console.log("error", e)
    // }
    try {
        let response = await fetch(
            `${API_URL}/obtain-token/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({username: 'admin', password: 'admin'})
            }
        );
        let responseJson = await response.json();
        await SecureStore.setItemAsync('secure_token', responseJson.token)

        return responseJson;
    } catch (error) {
        console.error(error);
    }
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
