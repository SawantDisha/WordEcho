import { useCallback, useState } from "react"
import { QueryParams } from "../types/common.type"

interface Props<M> {
    service: any
}

export default function useViewRecord<M>({
    service
}: Props<M>) {

    const [record, setRecord] = useState<M>()
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState<string>()
    const controller = new AbortController()
    const { signal } = controller

    const loadRecord = useCallback(
        async (id: any, params: QueryParams) => {
            try {
                setLoading(true)
                const response = await service.getOne(id, params, { signal: signal })
                setLoading(false)
                setRecord(response.data)
                setError(undefined)

                return response.data
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    setLoading(false)
                    setError('Failed to fetch records.')
                    setRecord(undefined)
                }
            }
        },
        [service],
    )

    const abortLoadRecord = () => {
        controller.abort()
    }


    return {
        record,
        loading,
        error,
        loadRecord,
        abortLoadRecord,
    }
}