import React from 'react'

const Dish = ({dish}) => {

    return(
        <div className='dish'>
            <label className='id'>{dish.id}</label>
            <label className='name'>{dish.name}</label>
            <label className='ready'>{dish.ready}</label>
        </div>
    )
}

export default Dish