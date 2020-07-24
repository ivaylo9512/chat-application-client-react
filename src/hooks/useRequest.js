import { useState, useEffect, useRef} from 'react';

export const useRequest = (initialUrl, initialParams, initialState, fetchOnMount) => {
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
        if(isCurrent.current){
            if(response.ok){
                data = JSON.parse(data)
                setData(data)
                return data
            }
            setError(data)
        }
    }

    return [data, error, setParams, setUrl, fetchRequest]
}

export default useRequest