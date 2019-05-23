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
            let user = await Axios.get('api/users/whoami')
            return user.data.is_staff;
        } catch {
            return false;
        }
    }
    static async logout() {
        return Axios.post('remove-token/');
    }
}
export default authService;

export var isAdmin;
export const validateAdmin = () => {
    authService.isCurrentUserAdmin().then(is_staff => isAdmin = is_staff);
}

validateAdmin();

export const displayIfAdmin = (template) => {
    if (isAdmin === true) {
        return template;
    } else {
        return null;
    }
}
