import { useState, useEffect, useRef} from 'react';

export const useRequest = ({initialUrl, initialValue, initialHeaders, fetchOnMount, callback, method, isAuth, shouldThrow = true}) => {
    const [data, setData] = useState(initialValue)
    const [requestUrl, setRequestUrl] = useState(initialUrl)
    const [error, setError] = useState()
    const isCurrent = useRef(true)

    useEffect(() =>{
        if(fetchOnMount){
            fetchRequest()
        }
        return () => isCurrent.current = false
    }, [])

    async function fetchRequest({url, body, headers} = {}) {
        headers = headers || initialHeaders
        headers = isAuth 
            ? {...headers, Authorization: localStorage.getItem('Authorization')} 
            : headers
        const response = await fetch(url || requestUrl, {
            method,
            body: JSON.stringify(body),
            headers
        })

        let data = await response.text()
        const responseHeaders = response.headers
        if(isCurrent.current){
            if(response.ok){
                data = JSON.parse(data)
                setData(data)
                if(callback){
                    callback(data, responseHeaders)
                }
            }else{
                if(shouldThrow){
                    setError(() => { 
                        throw {message:data, status: response.status}
                    })    
                }else{
                    setError(data)
                }
            }
        }
    }

    return [data, fetchRequest, error, setData, setRequestUrl]
}

export default useRequest