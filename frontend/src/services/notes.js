import axios from "axios"

const baseUrl =  process.env.REACT_APP_BASE_URL + '/api/notes';
const getAll = async () => {
    const request = await axios.get(baseUrl);

    return request;
}


export default getAll;