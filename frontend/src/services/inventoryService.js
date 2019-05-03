import axios from 'axios';

export const getItems = ({pageNumber : page, itemsPerPage : page_size}={}) => {
    let params = {};
    if(page !== undefined) params.page = page;
    if(page_size !== undefined) params.page_size = page_size;

    return axios({
        method: 'get',
        url: '/api/supplies/',
        params : params
    });
}

export const searchItems = ({searchPhase : name = "", pageNumber: page, itemsPerPage: page_size}={}) => {
    let params = {};
    params.name = name;
    if(page !== undefined) params.page = page;
    if(page_size !== undefined) params.page_size = page_size;

    return axios({
        method: 'get',
        url: '/api/supplies/search',
        params : params
    });
}

export const insertItem = async (item) =>  {
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

export const getReports = ({pageNumber : page, itemsPerPage : page_size}={}) => {
    let params = {};
    if(page !== undefined) params.page = page;
    if(page_size !== undefined) params.page_size = page_size;

    return axios({
        method: 'get',
        url: '/api/inventories/',
        params : params
    });
}

export const getReportsItems = ({reportId : id, pageNumber : page, itemsPerPage : page_size}={}) => {
    if(id === undefined) throw Error("ReportId not provided!");

    let params = {};
    if(page !== undefined) params.page = page;
    if(page_size !== undefined) params.page_size = page_size;

    return axios({
        method: 'get',
        url: `/api/inventories/${id}`,
        params : params
    });
}

export const partialUpdateReportItem = ({reportId, supplyId, is_checked} = {}) => {
    if(reportId === undefined)   throw Error("reportId not provided!");
    if(supplyId === undefined)   throw Error("supplyId not provided!");
    if(is_checked === undefined) throw Error("is_checked not provided!");

    return axios({
        method: 'patch',
        url: `/api/inventories/${reportId}/supplies/${supplyId}`,
        data: {is_checked},
    });
}

export const createReport = async ({name, date}) =>  {
    if (name === undefined || name === "") throw Error("Name not provided!");

    let data = {name};
    if (date !== undefined) data.date = date;

    return axios({
        method: 'post',
        url: '/api/inventories/',
        data: data
    });
}

export const deleteReport = async (reportId) => {
    if(reportId === undefined) throw Error("ReportId not provided!");

    return axios({
        method: 'delete',
        url: `/api/inventories/remove/${reportId}`
    });
}
