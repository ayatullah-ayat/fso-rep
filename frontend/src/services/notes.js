import axios from "axios"
const baseUrl =  process.env.REACT_APP_BASE_URL + '/notes';
let token = null;

const getAll = async () => {
    const response = await axios.get(baseUrl);

    return response.data;
}

const setToken = (strToken) => {
    token = 'bearer '+ strToken;
}

const createNewNoteJsonServer = async(content) => {
    const note = {
        content,
        important: false
    }

    const newCreatedNote = await axios.post(baseUrl, note);
    return newCreatedNote.data;
}
const updateNoteJsonServer = async (id, note) => {
    const updateNote = note;
    const updatedNote = await axios.put(baseUrl + '/' + id, updateNote);
    return updatedNote.data;
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

export default { getAll, create, destroy, setToken, createNewNoteJsonServer, updateNoteJsonServer };