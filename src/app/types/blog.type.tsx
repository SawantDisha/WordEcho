import { IUser } from "./user.type"

export interface IBlog {
    id?: string
    title: string
    sub_title: string
    content: string   
    author_id: string
    author: IUser

    date: string
}