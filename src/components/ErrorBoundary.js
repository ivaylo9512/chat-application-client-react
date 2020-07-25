import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  state = {
    error: '',
  };

  componentDidCatch(error) {
    this.setState({ error });
  }

  static getDerivedStateFromError(error) {
    return { error };
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
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
}; 