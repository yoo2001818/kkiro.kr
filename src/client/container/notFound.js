import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <Helmet
          title='Page not found'
        />
        <h1>404 Page Not Found</h1>
      </div>
    );
  }
}
