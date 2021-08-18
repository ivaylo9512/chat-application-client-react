import { Component } from 'react';

export default class ErrorBoundary extends Component {
    state = {
        error: '',
    };

    componentDidCatch(error) {
        if(error.status == 401){
            this.props.logout()
        }
    }

    static getDerivedStateFromError(error) {
        if(error.status == 401){
            return { error:'' }
        }
        return  { error:error.message };
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