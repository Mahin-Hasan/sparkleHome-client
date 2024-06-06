import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true// sends the token to the back end
})

const useAxios = () => {
    return instance;
};

export default useAxios;