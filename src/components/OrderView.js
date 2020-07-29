import React from 'react'
import { useRequest } from '../hooks/useRequest';
import Dish from './Dish';

const OrderView = (order, orders, setOrder, setOrders) => {
    const [,fetchDishStatus] = useRequest({callback: updateDish, isAuth: true})

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
        fetchDishStatus({url:`http://${localStorage.getItem('BaseUrl')}/api/order/auth/updateDish${dish}`})
    }

    return(
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
        </div>
    )
}

export default OrderView