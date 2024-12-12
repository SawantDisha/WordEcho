export interface IOneResponseDto<M> {
    data: M
}

export interface IManyResponseDto<M> {
    data: M[]
}

export interface QueryParams {
	search?: string
	populate?: string[] | string
	withCountOf?: string[] | string
	sortBy?: string
	sortType?: string
	per_page?: number
	page?: number
	scopes?: string
	[props: string]: any
}