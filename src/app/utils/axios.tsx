import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { serialize } from "object-to-formdata";
import { Env } from "./env";

export default function useAxios() {

    const authToken = localStorage.getItem('token');

    function _headers() {
        const headers: any = {}

        if(!!authToken) {
            headers['Authorization'] = `Bearer ${authToken}`
        }

        return headers
    }

    const axiosInstance = axios.create({
        baseURL: Env.API_HOST,
        headers: _headers(),
        timeout: 60000,

        // validateStatus: function (status) {
        // 	return status < 500 // default
        // },
    })

    async function get<M>(path: string, config?: AxiosRequestConfig): Promise<any> {
        try {
            const response = await axiosInstance.get<M>(`${path}`, config)

            return response.data
        } catch (err) {
            const error: AxiosError = err as AxiosError

            // handleErr

            throw error
        }
    }

    async function post<M>(path: string, data: Object, config?: AxiosRequestConfig): Promise<any> {
        const formData = serialize(data, {
            dotsForObjectNotation: false,
            indices: true,
            // noFilesWithArrayNotation: false, // While making this true files goes as file:abc.jpg file:bcd and on false file[0]:abc file[1]:bcd 
            allowEmptyArrays: true,
            booleansAsIntegers: true,
            // noAttributesWithArrayNotation: true,
            // nullsAsUndefineds: true,
        })

        try {
            const response = await axiosInstance.post<M>(`${path}`, formData, config)

            return response.data
        } catch (err) {
            const error: AxiosError = err as AxiosError

            // handleErr

            throw error
        }
    }

    async function put<M>(path: string, data: Object, config?: AxiosRequestConfig): Promise<any> {
        const formData = serialize(data, {
            dotsForObjectNotation: false,
            indices: true,
            // noFilesWithArrayNotation: false, // While making this true files goes as file:abc.jpg file:bcd and on false file[0]:abc file[1]:bcd 
            allowEmptyArrays: true,
            booleansAsIntegers: true,
            // noAttributesWithArrayNotation: true,
            // nullsAsUndefineds: true,
        })

        try {
            const response = await axiosInstance.put<M>(`${path}`, formData, config)

            return response.data
        } catch (err) {
            const error: AxiosError = err as AxiosError

            // handleErr

            throw error
        }
    }

    async function destroy<M>(path: string, config?: AxiosRequestConfig) {
        try {
            const response = await axiosInstance.delete<M>(`${path}`, config)

            return response.data
        } catch (err) {
            const error: AxiosError = err as AxiosError

            throw error
        }
    }

    return {
        get,
        post,
        put,
        destroy,
    }
}