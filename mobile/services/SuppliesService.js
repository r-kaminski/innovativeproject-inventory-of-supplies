import {API_URL} from "../api";
import {setHeaders} from "./AuthService";
import * as querystring from "querystring";

export async function getSupplies(paginationData) {
    let headers = null
    await setHeaders().then((res) => headers = res);
    try {
        let response = await fetch(
            `${API_URL}/api/supplies/?${querystring.stringify(paginationData)}`,
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

export async function postSupply(supply) {
    let headers = null
    await setHeaders().then((res) => headers = res);
    try {
        let response = await fetch(
            `${API_URL}/api/supplies/`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(supply)
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

export async function getSupply(id) {
    let headers = null
    await setHeaders().then((res) => headers = res);
    try {
        let response = await fetch(
            `${API_URL}/api/supplies/${id}`,
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

export async function updateSupply(id, supply) {
    console.log(supply)
    let headers = null
    await setHeaders().then((res) => headers = res);
    try {
        let response = await fetch(
            `${API_URL}/api/supplies/${id}/`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(supply)
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}