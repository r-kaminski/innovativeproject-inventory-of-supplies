import Axios from 'axios'

class authService {

    static loginToken = credentials => {
        return Axios.post('obtain-token/', { username: credentials.username, password: credentials.password });
    }

    static registerToken = credentials => {
        return Axios.post('rest-auth/registration/', { username: credentials.username, email: credentials.email, password1: credentials.password1, password2: credentials.password2 });
    }

    static async isCurrentUserAdmin() {
        try {
            return (await Axios.get('api/users/current')).is_staff;
        } catch {
            return false;
        }
    }
}
export default authService;
