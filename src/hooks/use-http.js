import { useState, useCallback } from 'react'

const useHttp = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const sendReq = useCallback(async (reqConfig, applyData) => {
        setError(null)
        setIsLoading(true)

        try {
            const res = reqConfig.options
                ? await fetch(reqConfig.url, reqConfig.options)
                : await fetch(reqConfig.url)

            if (!res.ok) {
                throw new Error('Request failed!')
            }

            const data = await res.json()
            applyData(data)
        } catch (err) {
            setError(err.message || 'Something went wrong!')
        }

        setIsLoading(false)
    }, [])

    return {
        error,
        isLoading,
        sendReq
    }
}

export default useHttp
