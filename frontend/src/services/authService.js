import Axios from 'axios'

class authService {

    static loginToken = async (credentials) => {
        let response = await Axios.post('obtain-token/', { username: credentials.username, password: credentials.password1 })
        return response
    }

    static registerToken = async (credentials) => {
        let response = await Axios.post('rest-auth/registration/', { username: credentials.username, email: credentials.email, password1: credentials.password1, password2: credentials.password2 })
        return response
    }
}
export default authService;
