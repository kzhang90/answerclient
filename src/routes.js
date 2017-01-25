import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import GreetingPage from './components/pages/GreetingPage';
import HomePage from './components/pages/HomePage';
import SignupPage from './components/pages/SignupPage';
import LoginPage from './components/pages/LoginPage';
import NotFoundPage from './components/pages/NotFoundPage';
// requireAuth is a higher-order component
import requireAuth from './utils/requireAuth';

// a path to see all of the details of a tag
const routes = (
    <Route path="/" component={Layout}>
      <IndexRoute component={GreetingPage} />
      <Route path="signup" component={SignupPage} />
      <Route path="login" component={LoginPage} />
      <Route path="home" component={requireAuth(HomePage)} />
      <Route path="*" component={NotFoundPage} />
    </Route>
);

export default routes;

