import React from 'react';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import TextFieldGroup from './common/TextFieldGroup';

function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = "This field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "This field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "This field is required";
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "This field is required";
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords must match.";
  }

  return {
     // return the errors object and isValid
    errors,
    isValid: isEmpty(errors)
  };
}

class SignupForm extends React.Component {
  constructor() {
    // call super(props) or else risking code-breaking this.props = undefined.
    super();
    this.state = {
      username: '',
      email: '',
      password:'',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      invalid: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  onSubmit(e) {
    e.preventDefault();
    // every time we submit, we want to clear the errors.
    // dispatches actions and makes the ajax request.
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      console.log('in onsubmit');
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully.'
          });
          this.context.router.push('/');
        },
// below might instead have to be 
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }
  // checkUserExists event handler.
  checkUserExists(e) {
    const field = e.target.name;
    // username or email
    const val = e.target.value;
    // if value is not empty
    if (val !== '') {
      // isUserExists is an action.
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = 'There exists a user with such ' + field
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }

        this.setState({ errors, invalid });
      })
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>

        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.username}
          field="username"
        />

        <TextFieldGroup
          error={errors.email}
          label="Email"
          checkUserExists={this.checkUserExists}
          onChange={this.onChange}
          value={this.state.email}
          field="email"
        />        

        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />        

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />

        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm;