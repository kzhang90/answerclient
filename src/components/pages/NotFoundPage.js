import React from 'react';
import { Link } from 'react-router';

class NotFoundPage extends React.Component {
  render() {
    return (
      // theres an error in one of the create elements, because they are null, undefined, boolean, or number
      <div className="not-found">
        <h1>404</h1>
        <h2>Page not found!</h2>
        <p>
          <Link to="/">Go back to the main page</Link>
        </p>
      </div>
    );
  }
}

export default NotFoundPage;