import { Component } from "react";
import { Link } from "react-router-dom";
// import { signUp } from "../../utilities/users-service";

export default class SignUpForm extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: ''
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const formData = {...this.state};
      delete formData.error;
      delete formData.confirm;

      const user = await signUp(formData);
      // Baby step!
      console.log(user);

      this.props.updateUser(user);

    } catch {
      this.setState({error: "Sign Up Failed - Try Again"});
    }
  };


  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <input type="text" name="username" value={this.state.name} onChange={this.handleChange} required placeholder="username"/>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required placeholder="email"/>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required placeholder="password"/>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required placeholder="confirm password"/>
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
        <p>Already have an account? <Link to='/login'>Log In</Link></p>
      </div>
    );
  }
}