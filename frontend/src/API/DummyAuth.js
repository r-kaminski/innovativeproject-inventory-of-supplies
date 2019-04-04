import axios from 'axios';

export const obtainToken = () => {
    return axios({
            method: 'post',    
            url: '/obtain-token/', 
            data: {
                username: 'admin',
                password: 'admin'
            }
        });
}