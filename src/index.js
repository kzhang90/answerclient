import React from 'react';
import { render } from 'react-dom';
import App from './App';

window.onload = function() {
  render(<App />, document.getElementById('app'));
};