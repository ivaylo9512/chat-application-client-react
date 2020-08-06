import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    state = {
        error: '',
    };

    static getDerivedStateFromError(error) {
        return  { error: error.message };
    }
  
    render() {
        const { error } = this.state
        if(error){
            return(
            <div>
              {error}
            </div>
          )
        }
        return this.props.children;
    }
}