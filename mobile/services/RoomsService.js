import {API_URL} from "../api";
import {setHeaders} from "./AuthService";

//przyklad
export async function getMoviesFromApi() {
    try {
        let response = await fetch(
            'https://facebook.github.io/react-native/movies.json',
        );
        let responseJson = await response.json();
        return responseJson.movies;
    } catch (error) {
        console.error(error);
    }
}

export async function getRooms() {
    try {
        let response = await fetch(
            `${API_URL}/api/rooms/`,
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

export async function postRoom(roomName) {
    let headers = null
    await setHeaders().then((res) => headers = res);
    try {
        let response = await fetch(
            `${API_URL}/api/rooms/create`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({name: roomName})
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

export async function updateRoom(roomId, roomName) {
    let headers = setHeaders()
    try {
        let response = await fetch(
            `${API_URL}/api/rooms/update/${roomId}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify({name: roomName})
            }
        );
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}