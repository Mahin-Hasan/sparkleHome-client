import axios from "axios";
import useAuth from "./useAuth";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true// sends the token to the back end
})

const useAxios = () => {
    const { logout } = useAuth();

    instance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {// this error function triggers when token is not in application 
            console.log('From Axios', error);
            if (error.response.status === 401 || error.response.status === 403) {
                logout()
            }
        }
    )

    return instance;
};

export default useAxios;