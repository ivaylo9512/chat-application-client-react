import React, { useState } from 'react'
import { useRequest } from '../../hooks/useRequest'
import Form from '../Form/Form'

const CreateOrder = ({menu, searchClass}) => {
    const [order, fetchNewOrder] = useRequest({initialUrl:`${localStorage.getItem('BaseUrl')}/api/order/auth/create}`, isAuth:true})
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
            <Form placeholder={'search menu'} callback={search} searchClass={searchClass}/>
        </>
    )
}
export default CreateOrder