import { useCallback, useState } from "react"
import { QueryParams } from "../types/common.type"

interface Props<M> {
    service: any
}

export default function useListRecord<M>({
    service
}: Props<M>) {

    const [records, setRecords] = useState<M[]>()
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState<string>()
    const controller = new AbortController()
    const { signal } = controller

    const loadRecords = useCallback(
        async (params: QueryParams) => {
            try {
                setLoading(true)
                const response = await service.getMany(params, { signal: signal })
                setLoading(false)
                setRecords(response.data)
                setError(undefined)
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    setLoading(false)
                    setError('Failed to fetch records.')
                    setRecords(undefined)
                }
            }
        },
        [service],
    )

    const abortLoadRecords = () => {
        controller.abort()
    }


    return {
        count: records?.length ?? 0,
        records,
        loading,
        error,
        loadRecords,
        abortLoadRecords,
    }
}