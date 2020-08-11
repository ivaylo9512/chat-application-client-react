import React, { useState } from 'react'
import { useRequest } from '../hooks/useRequest';

const CreateOrder = (menu) => {
    const [order, fetchNewOrder] = useRequest({initialUrl:`http://${localStorage.getItem('BaseUrl')}/api/order/auth/create}`, isAuth:true})
    const [filteredMenu, setFilteredMenu] = useState()
    
    const search = (e) => {
        setFilteredMenu(menu.filter(m => m.name.includes(e.target)))
    }
    
    return(
        <>
            <div>
                {filteredMenu.map(m => 
                    <div>
                        {e.name}
                    </div>
                )}
            </div>
            <div className="form-container">
                <form onSubmit={search}>
                    {nameInput}
                    <button><i className='fas fa-search'></i></button>
                </form>
            </div>
        </>
    )
}
export default CreateOrder