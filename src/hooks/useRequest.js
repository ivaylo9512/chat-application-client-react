import { useState, useEffect, useRef} from 'react';

export const useRequest = (initialUrl, initialParams, initialState) => {
    const [data, setData] = useState(initialState)
    const [params, setParams] = useState(initialParams)
    const [url, setUrl] = useState(initialUrl)
    const [error, setError] = useState()
    const isMounted = useRef(false)

    useEffect(() =>{
        if(!isMouted.current){
            isMounted.current = true
        }else{
            fetchRequest()
        }
    }, [url, params])

    async function fetchRequest() {
        const response = await fetch(url, params)
        const data = await response.text()
        if(response.ok){
            setData(JSON.parse(data))
        }else{
            setError(data)
        }
    }
    
    return [data, error, setParams, setUrl, fetchRequest]
}