import axios from 'axios';

// use this function when we login and when reload page.
export default function setAuthorizationtoken(token) {
  // if we provide a token we add an authorization header to every request
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    //  else we delete the authorization header.
    delete axios.defaults.headers.common['Authorization'];
  }
  // use this in login and when user reloads page.
}