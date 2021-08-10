import React from 'react'
import { render } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStylesState, toggleHeaderVisibility, toggleSearchVisibility } from '../../app/slices/stylesSlice';

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
        <nav style={rotate}>
            <ul>
                <li>
                    <button tabIndex='-1'>
                        <i className='fas fa-user'></i>
                    </button>
                </li>
                <li>
                    <button onClick={toggleHeader} tabIndex='-1'>
                        <i className={isHeaderHidden  ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                    </button>
                </li>
                <li>
                    <Link to='/searchChat' tabIndex='-1'>
                        <i className='fas fa-search'></i>
                    </Link>
                </li>
                <li>
                    <Link to='/searchUsers' tabIndex='-1'>
                        <i className='fas fa-user-plus'></i>
                    </Link>
                </li>
                {(location.pathname == '/searchUsers' || location.pathname == '/searchChat') &&
                    <li>
                        <button onClick={toggleSearch}>
                            <i className={isSearchHidden ? 'fas fa-caret-up' : 'fas fa-caret-down' }></i>
                        </button>
                    </li>
                }
                <li>
                    <Link to='/logout' tabIndex='-1'>
                        <i className='fas fa-sign-out-alt'></i>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default MenuNav