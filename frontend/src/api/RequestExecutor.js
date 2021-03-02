import axios from "axios";


const requestType = {
    POST: 'post',
    GET: 'get',
    PUT: 'put',
    DELETE: 'delete'
};

const API_LOG = true;

axios.interceptors.request.use(request => {
    if (API_LOG)
        console.log('API request=', request);
    return request
});

export async function executeRequest(method: string, url: string, headers: any, params: any, data: any) {
    let response = await axios({
        method: method,
        url: url,
        headers: headers,
        params: params,
        data: data,
    })
        .then(async function (response) {
            if (response.data)
                return response.data;
            else
                return response;
        })
        .catch(function (error) {
            if (error.response) {
                if (API_LOG)
                    console.warn('ERROR', error.response.data);
                return error.response.data;
            } else if (error.request) {
                if (API_LOG)
                    console.warn('ERROR', error);
                return {};
            } else {
                if (API_LOG)
                    console.warn('ERROR', "Something went wrong");
                return {};
            }
        });

    if (API_LOG)
        console.log('API RESPONSE=', response);
    return response;
}

export async function postRequest(url, data) {
    let response = await executeRequest(requestType.POST, url, null, null, data);
    return response;
}


export async function getRequest(url) {
    let authToken = null;
    authToken = 'bearer ' + authToken;
    let response = await executeRequest(requestType.GET, url, { Authorization: authToken }, null, null);
    return response;
}
export async function getRequestWithHeader(url, token) {
    let authToken = null;
    authToken = 'Bearer ' + token;
    let response = await executeRequest(requestType.GET, url, { Authorization: authToken }, null, null);
    return response;
}


export async function putRequest(url, data) {
    let authToken = null;
    authToken = 'bearer ' + authToken;
    let response = await executeRequest(requestType.PUT, url, { authorization: authToken }, null, data);
    return response;
}

export async function deleteRequest(url, data) {
    let authToken = null;
    authToken = 'bearer ' + authToken;
    let response = await executeRequest(requestType.DELETE, url, { authorization: authToken }, null, data);
    return response;
}