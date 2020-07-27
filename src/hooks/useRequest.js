import { useState, useEffect, useRef} from 'react';

export const useRequest = ({initialUrl, initialValue, initialHeaders, fetchOnMount, callback, method, isAuth}) => {
    const [data, setData] = useState(initialValue)
    const [url, setUrl] = useState(initialUrl)
    const [requestHeaders, setHeaders] = useState(initialHeaders)
    const [body, setBody] = useState()
    const [error, setError] = useState()
    const isCurrent = useRef(true)

    useEffect(() =>{
        if(fetchOnMount){
            fetchRequest()
        }
        return () => isCurrent.current = false
    }, [])

    async function fetchRequest() {
        const response = await fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: isAuth ? 
                {...requestHeaders, Authorization: localStorage.getItem('Authorization')} :
                requestHeaders
        })
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

    return [data, fetchRequest, setBody, setUrl, setHeaders, error]
}

export default useRequest