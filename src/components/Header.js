import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Header extends Component{

    constructor(){
        super()
        this.header = React.createRef()
        this.menuCircle = React.createRef()
    }

    hideMenu = () => {
        this.header.current.classList.add('hide')
        this.menuCircle.current.classList.add('show')
    }

    showHeader = () => {
        this.header.current.classList.remove('hide')
        this.menuCircle.current.classList.remove('show')
        
    }

    toggleChats = () => {
        this.props.chatList.current.classList.toggle('hide')
    }

    render(){
        return (
            <div ref={this.header} className="header-container">
                <button className="menu-circle" onClick={this.showHeader} ref={this.menuCircle}><i className="fas fa-bars"></i></button>
                <header>
                    <button className="circle-btn">-</button>
                    <div className="circle-nav" id="cn-wrapper">
                        <ul>
                            <li><span><i className="fas fa-user"></i></span></li>
                            <li><span onClick={this.toggleChats}><i className="fas fa-comments"></i></span></li>
                            <li><Link to="/searchChat"><i className="fas fa-search"></i></Link></li>
                            <li><Link to="/searchUsers"><i className="fas fa-user-plus"></i></Link></li>
                            <li><span onClick={this.hideMenu}><i className="fas fa-sign-out-alt"></i></span></li>
                        </ul>
                    </div>
                </header>
            </div>
        )

    }
}

export default Header