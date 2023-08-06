import Axios from "axios";

const axios = Axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Allow-Control-Allow-Origin": "*"
    },
    withCredentials: true
})

export default axios;