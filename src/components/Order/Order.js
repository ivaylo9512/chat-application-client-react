import React from 'react';
import { Link } from 'react-router-dom'

const Order = ({order}) => {
    return (
        <Link to='/chat' className='order'>
            {order.id}
        </Link>
    )
}

export default Order