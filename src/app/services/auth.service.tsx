import { AxiosRequestConfig } from "axios";
import { IOneResponseDto } from "../types/common.type";
import useAxios from "../utils/axios"

export default function useAuthService() {

    const axios = useAxios();


    async function check() {
        const url = `/users/check`
        const response = await axios.get<IOneResponseDto<any>>(url);

        return response;
    }

    async function login(email: string, password: string) {
        const url = `/users/login`
        const response = await axios.post<IOneResponseDto<any>>(url, {
            email: email,
            password: password,
        });

        return response;
    }

    async function register(data: object, init?: AxiosRequestConfig) {
        const url = `/users/register`
        const response = await axios.post<IOneResponseDto<any>>(url, data, init);

        return response;
    }

    return {
        check,
        login,
        register,
    }
}