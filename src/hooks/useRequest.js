import { useState, useEffect, useRef} from 'react';

export const useRequest = (initialUrl, initialParams, initialState, fetchOnMount, callback) => {
    const [data, setData] = useState(initialState)
    const [params, setParams] = useState(initialParams)
    const [url, setUrl] = useState(initialUrl)
    const [error, setError] = useState()
    const isMounted = useRef(fetchOnMount)
    const isCurrent = useRef(true)

    useEffect(() =>{
        if(!isMounted.current){
            isMounted.current = true
        }else{
            fetchRequest()
        }
        return () => isCurrent.current = false
    }, [url, params])

    async function fetchRequest() {
        const response = await fetch(url, params)
        let data = await response.text()
        const headers = response.headers
        if(isCurrent.current){
            if(response.ok){
                data = JSON.parse(data)
                setData(data)
                if(callback){
                    callback(data, headers)
                }
            }else{
                setError(data)
            }
        }
    }

    return [data, fetchRequest, setParams, setUrl, error]
}

export default useRequest