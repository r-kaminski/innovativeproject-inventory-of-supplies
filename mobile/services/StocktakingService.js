import {API_URL} from "../api";
import {setHeaders} from "./AuthService";
import * as querystring from "querystring";

export async function getStocktakings(paginationData) {
    let headers = null
    await setHeaders().then((res) => headers = res);
    try {
        let response = await fetch(
            `${API_URL}/api/inventories/?${querystring.stringify(paginationData)}`,
            {
                headers: headers,
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

export async function postStocktaking(name) {
    let body = {
        date: new Date(),
        name: name
    }
    let headers = null
    await setHeaders().then((res) => headers = res);
    try {
        let response = await fetch(
            `${API_URL}/api/inventories/create`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

export async function getStocktaking(id) {
    let headers = null
    await setHeaders().then((res) => headers = res);
    try {
        let response = await fetch(
            `${API_URL}/api/inventories/${id}`,
            {
                headers: headers,
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

export async function updateStocktaking(id, stacktaking) {
    let headers = null
    await setHeaders().then((res) => headers = res);
    try {
        let response = await fetch(
            `${API_URL}/api/inventories/${id}/`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(stacktaking)
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}