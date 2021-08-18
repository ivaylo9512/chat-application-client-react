import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStylesState, toggleHeaderVisibility, toggleSearchVisibility } from 'app/slices/stylesSlice';
import { Button, Li, Nav } from './MenuNavStyles'

const MenuNav = ({rotate}) => {
    const location = useLocation();
    const {isHeaderHidden, isSearchHidden} = useSelector(getStylesState)
    const dispatch = useDispatch();

    const toggleHeader = () => { 
        dispatch(toggleHeaderVisibility());
    }
    
    const toggleSearch = () => {
        dispatch(toggleSearchVisibility());
    }

    return(
        <Nav style={rotate}>
            <ul>
                <Li>
                    <Button tabIndex='-1'>
                        <i className='fas fa-user'></i>
                    </Button>
                </Li>
                <Li>
                    <Button onClick={toggleHeader} tabIndex='-1'>
                        <i className={isHeaderHidden  ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                    </Button>
                </Li>
                <Li>
                    <Link to='/searchChat' tabIndex='-1'>
                        <i className='fas fa-search'></i>
                    </Link>
                </Li>
                <Li>
                    <Link to='/searchUsers' tabIndex='-1'>
                        <i className='fas fa-user-plus'></i>
                    </Link>
                </Li>
                {(location.pathname == '/searchUsers' || location.pathname == '/searchChat') &&
                    <Li>
                        <Button onClick={toggleSearch}>
                            <i className={isSearchHidden ? 'fas fa-caret-up' : 'fas fa-caret-down' }></i>
                        </Button>
                    </Li>
                }
                <Li>
                    <Link to='/logout' tabIndex='-1'>
                        <i className='fas fa-sign-out-alt'></i>
                    </Link>
                </Li>
            </ul>
        </Nav>
    )
}
export default MenuNav