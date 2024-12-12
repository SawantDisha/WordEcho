import { AxiosRequestConfig } from "axios";
import { IComment } from "../types/comment.type";
import { IManyResponseDto, IOneResponseDto, QueryParams } from "../types/common.type";
import useAxios from "../utils/axios";
import qs from 'query-string'


export default function useCommentService() {

    const axios = useAxios();

    async function getMany(queryString?: QueryParams, init?: AxiosRequestConfig): Promise<IManyResponseDto<IComment>> {
        const url = `/comments?${!!queryString ? qs.stringify(queryString) : ''}`
        const response = await axios.get<IManyResponseDto<IComment>>(url, init);

        return response;
    }

    // async function getOne(id: any, queryString?: QueryParams, init?: AxiosRequestConfig) {
    //     const url = `/comments/${id}?${!!queryString ? qs.stringify(queryString) : ''}`
    //     const response = await axios.get<IOneResponseDto<IComment>>(url, init);

    //     return response;
    // }

    async function createOne(data: object, queryString?: QueryParams, init?: AxiosRequestConfig) {
        const url = `/comments?${!!queryString ? qs.stringify(queryString) : ''}`
        const response = await axios.post<IManyResponseDto<IComment>>(url, data, init);

        return response;
    }

    // async function updateOne(id: any, data: object, queryString?: QueryParams, init?: AxiosRequestConfig) {
    //     const url = `/comments/${id}?${!!queryString ? qs.stringify(queryString) : ''}`
    //     const response = await axios.put<IManyResponseDto<IComment>>(url, data, init);

    //     return response;
    // }

    async function deleteOne(id: any, queryString?: QueryParams, init?: AxiosRequestConfig) {
        const url = `/comments/${id}?${!!queryString ? qs.stringify(queryString) : ''}`
        const response = await axios.destroy<IManyResponseDto<IComment>>(url, init);

        return response;
    }

    return {
        getMany,
        // getOne,
        createOne,
        // updateOne,
        deleteOne,
    }
}