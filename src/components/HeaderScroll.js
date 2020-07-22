import { useState, useRef } from 'react'

const HeaderScroll = (headerType) => {
    const [chatUsers, setChatUsers] = useState() 
    const [orders, setOrders] = useState() 
    const isMounted = useRef(false)

    useEffect(() =>  {
        let isCurrent =  true;
        if(isMounted){
            async function fetchChats(){
                const response = await fetch('http://localhost:8080/api/chat/auth/getChats?pageSize=3',{
                    headers: {
                        'Authorization': localStorage.getItem('Authorization')
                    }
                })
                const data = await response.text()
                if(isCurrent){
                    if(response.ok){
                        setChatUsers(JSON.parse(data))
                    }else{
                        setError(data)
                    }
                }  
            }   
            fetchChats() 
        }
        return () => isCurrent = false
    }, [])

    useEffect(() =>  {
        let isCurrent =  true;
        if(!isMounted.current){
            isMounted.current = true
        }else{
            async function fetchOrders(){
                const response = await fetch('http://localhost:8080/api/orders/auth/getOrders',{
                    headers: {
                        'Authorization': localStorage.getItem('Authorization')
                    }
                })
                const data = await response.text()
                if(isCurrent){
                    if(response.ok){
                        setOrders(JSON.parse(data))
                    }else{
                        setError(data)                
                    }
                }  
            }   
            fetchOrders() 
        }
        return () => isCurrent = false
    }, [])

    return (
        <>

        </>
    )
}

export default HeaderScroll