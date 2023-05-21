import axios from "axios"

const baseUrl =  process.env.REACT_APP_BASE_URL + '/api/notes';
let token = null;

const getAll = async () => {
    const request = await axios.get(baseUrl);

    return request;
}

const setToken = (strToken) => {
    token = strToken;
}

const create = async (newObject) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
}

export default { getAll, create, setToken };