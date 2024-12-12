import { IUser } from "./user.type"

export interface IComment {
    id: string
    blog_id: string
    content: string
    author_id: string
    author?: IUser
}