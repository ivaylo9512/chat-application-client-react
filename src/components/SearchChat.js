import React, { Component } from 'react'

class SearchChat extends Component {  

    state = {
        name : ''
    }

    changeInput = (e) => {
        const{name, value} = e.target
        this.setState({
            name : value
        })
        this.props.searchChats(e.target.value)
    }
    
    render() {
        return (
            <form onSubmit={this.searchChats}>
                <input value={this.state.name} onChange={this.changeInput}/>
            </form>
        )
    }
}

export default SearchChat