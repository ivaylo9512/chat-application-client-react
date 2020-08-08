import React, { useRef } from 'react'
import { useRequest } from '../hooks/useRequest';
import Dish from './Dish';
import { useParams } from "react-router";

const OrderView = (order, orders, setOrder, setOrders) => {
    const [,fetchDishStatus] = useRequest({callback: updateDish, isAuth: true})
    const { id } = useParams();
    const baseUrl = useRef(localStorage.getItem('BaseUrl'))

    const updateDish = (dish) => {
        setOrder({
            ...order, 
            dishes:{
                ...order.dishes,
                dish
            }
        })
        setOrders({
            ...orders,
            order
        })
    } 

    const updateDishStatus = (dish) => {
        fetchDishStatus({url:`http://${baseUrl}/api/order/auth/updateDish${dish}`})
    }

    return(
        <>
            {id !== undefined ?
                <div className="order-view">
                    <div>
                        <span>{order.id}</span>
                    </div>
                    <div>
                        <span>{order.ready}</span>
                    </div>
                    <div>
                        <span>{order.dishes}</span>
                    </div>
                    <div>
                        <span>{order.createdDate}</span>
                    </div>
                    <div>
                        <span>{order.updatedDate}</span>
                    </div>
                    <div className="dishes">
                        {order.dishes.map(dish => {
                            return <Dish key={dish.id} onClick={() => updateDishStatus(dish.id)} dish={dish}/>
                        })}
                    </div>
                </div> : 
                <p>No order is selected!</p>
            }
        </>

    )
}

export default OrderView