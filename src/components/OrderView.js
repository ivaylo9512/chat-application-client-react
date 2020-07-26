import React from 'react'

const OrderView = (order) => {

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
                    return <Dish key={dish.id} dish={dish}/>
                })}
            </div>
        </div>
    )
}

export default OrderView