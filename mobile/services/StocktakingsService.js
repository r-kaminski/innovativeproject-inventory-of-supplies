import { API_URL } from "../api";
import { setHeaders } from "./AuthService";
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

export async function checkSupply(stocktakingId, supplyId) {
    let headers = null
    await setHeaders().then((res) => headers = res);
    try {
        let response = await fetch(
            `${API_URL}/api/inventories/${stocktakingId}/supplies/${supplyId}`,
            {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({ is_checked: true }),
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}