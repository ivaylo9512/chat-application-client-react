import React, { Component } from 'react'

class SearchChat extends Component {  

    state = {
        name : ''
    }

    changeInput = (e) => {
        const{name, value} = e.target
        this.setState({
            [name] : value
        })
        this.props.searchChats(value)
    }
    
    render() {
        return (
            <div className='form-container'>
                <form onSubmit={this.searchChats}>
                    <input name='name' placeholder='search chat' value={this.state.name} onChange={this.changeInput}/>
                    <button><i className='fas fa-search'></i></button>
                </form>
            </div>
        )
    }
}

export default SearchChat