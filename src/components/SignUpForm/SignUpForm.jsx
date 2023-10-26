import { Component } from "react";
import { Link } from "react-router-dom";
import { signUpService } from "../../utilities/users/users-service";


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

      const user = await signUpService(formData);
      // Baby step!
      // console.log(user);

      this.props.updateUser(user);

      window.location = "/";

    } catch {
      this.setState({error: "Sign Up Failed - Try Again"});
    }
  };


  render() {
    const disable = (this.state.password !== this.state.confirm) || (this.state.password.length < 3);
    return (
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
    <div className="row align-items-center g-lg-5 py-5">
      <div className="col-lg-7 text-center text-lg-start">
        <img src="" alt="meowstagram" />
      </div>
      <div className="col-md-10 mx-auto col-lg-5">
        <form onSubmit={this.handleSubmit} className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <p className="text-center pb-2">meowstagram</p>
          <div className="form-floating mb-3">
            <input value={this.state.username} onChange={this.handleChange} required name="username" type="text" className="form-control" id="floatingInput" placeholder="username" />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input value={this.state.email} onChange={this.handleChange} required name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input value={this.state.password} onChange={this.handleChange} required name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating mb-3">
            <input value={this.state.confirm} onChange={this.handleChange} required name="confirm" type="password" className="form-control" id="floatingPassword" placeholder="Confirm Password" />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">SIGN UP</button>
          <p className="error-message">&nbsp;{this.state.error}</p>
          <hr className="my-4" />
          <small className="text-body-secondary">Already have an account? <Link to='/login'>Log In</Link></small>
        </form>
      </div>
    </div>
  </div>
    );
  }
}




{/* <div>
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
      </div> */}