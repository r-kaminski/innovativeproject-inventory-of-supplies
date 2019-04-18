import axios from 'axios';

export const getItems = (pageNumber, itemsPerPage) => {
    return axios({
        method: 'get',
        url: '/api/supplies/',
        params : {
            page : pageNumber,
            page_size : itemsPerPage
        }
    });
}

export const insertItem = async (item) => {
    return axios({
        method: 'post',
        url: '/api/supplies/',
        data: item
    });
}

export const deleteItem = async (itemId) => {
    return axios({
        method: 'delete',
        url: `/api/supplies/${itemId}/`
    });
}

export const partialUpdateItem = (itemId, itemBody) => {
    return axios({
        method: 'patch',
        url: `/api/supplies/${itemId}/`,
        data: itemBody
    });
}