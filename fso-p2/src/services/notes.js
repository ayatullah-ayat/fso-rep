import axios from "axios"

const getAll = async () => {
    const request = await axios.get(process.env.REACT_APP_BASE_URL + '/api/notes');

    return request;
}


export default getAll;