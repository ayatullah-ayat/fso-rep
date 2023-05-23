import axios from "axios"

const baseUrl =  process.env.REACT_APP_BASE_URL + '/api/notes';
let token = null;

const getAll = async () => {
    const request = await axios.get(baseUrl);

    return request;
}

const setToken = (strToken) => {
    token = 'bearer '+ strToken;
}

const create = async (newObject) => {
    console.log('note creating...', token);
    const config = {
        headers: {
            Authorization: token
        }
    }
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
}

const destroy = async (id) => {
    let response = await axios.delete(baseUrl, id);

    return response;
}

export default { getAll, create, destroy, setToken };