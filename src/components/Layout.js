import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';
// import '../static/css/style.css';

class Layout extends React.Component {
  render() { 
    return (
      <div className="container">
        <NavigationBar />
        <FlashMessagesList />
        <div className="app-content">{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;