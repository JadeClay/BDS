import Axios from "axios";

const axios = Axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Allow-Control-Allow-Origin": "*"
    },
    withCredentials: true
})

export default axios;