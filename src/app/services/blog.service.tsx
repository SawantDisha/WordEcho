import { AxiosRequestConfig } from "axios";
import { IBlog } from "../types/blog.type";
import { IManyResponseDto, IOneResponseDto, QueryParams } from "../types/common.type";
import useAxios from "../utils/axios";
import qs from 'query-string'


export default function useBlogService() {

    const axios = useAxios();

    async function getMany(queryString?: QueryParams, init?: AxiosRequestConfig): Promise<IManyResponseDto<IBlog>> {
        const url = `/blogs?${!!queryString ? qs.stringify(queryString) : ''}`
        const response = await axios.get<IManyResponseDto<IBlog>>(url, init);

        return response;
    }

    async function getOne(id: any, queryString?: QueryParams, init?: AxiosRequestConfig) {
        const url = `/blogs/${id}?${!!queryString ? qs.stringify(queryString) : ''}`
        const response = await axios.get<IOneResponseDto<IBlog>>(url, init);

        return response;
    }

    async function createOne(data: object, queryString?: QueryParams, init?: AxiosRequestConfig) {
        const url = `/blogs?${!!queryString ? qs.stringify(queryString) : ''}`
        const response = await axios.post<IManyResponseDto<IBlog>>(url, data, init);

        return response;
    }

    async function updateOne(id: any, data: object, queryString?: QueryParams, init?: AxiosRequestConfig) {
        const url = `/blogs/${id}?${!!queryString ? qs.stringify(queryString) : ''}`
        const response = await axios.put<IManyResponseDto<IBlog>>(url, data, init);

        return response;
    }

    async function deleteOne(id: any, queryString?: QueryParams, init?: AxiosRequestConfig) {
        const url = `/blogs/${id}?${!!queryString ? qs.stringify(queryString) : ''}`
        const response = await axios.destroy<IManyResponseDto<IBlog>>(url, init);

        return response;
    }

    return {
        getMany,
        getOne,
        createOne,
        updateOne,
        deleteOne,
    }
}