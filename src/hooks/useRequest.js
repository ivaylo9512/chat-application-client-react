import { useState, useEffect, useRef} from 'react';

export const useRequest = ({initialUrl, initialValue, initialHeaders, fetchOnMount, callback, type = 'get', shouldThrow = true}) => {
    const [data, setData] = useState(initialValue)
    const [error, setError] = useState()
    const isCurrent = useRef(true)

    useEffect(() =>{
        if(fetchOnMount){
            fetchRequest()
        }
        return () => isCurrent.current = false;
    }, [])

    async function fetchRequest({url, body, headers} = {}) {
        headers = {
            ...headers, 
            ...initialHeaders
        }
        const response = await fetch(url || initialUrl, {
            type,
            body: JSON.stringify(body),
            headers
        })

        handleResponse(response);
    }

    const handleResponse = (response) => {
        let data = await response.text()
        const responseHeaders = response.headers
        if(!isCurrent.current){
            return;
        }

        if(response.ok){
            data = JSON.parse(data)
            setData(data)
            if(callback){
                callback(data, responseHeaders)
            }
        }else{
            if(shouldThrow){
                setError(() => { 
                    throw {
                        message:data, 
                        status: response.status
                    }
                })    
            }else{
                setError(data)
            }
        }
    }

    return [data, fetchRequest, error]
}

export default useRequest