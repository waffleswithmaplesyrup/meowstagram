import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../utilities/users/users-service";

export default function LoginForm({ updateUser }) {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
    setError("");
  };

  const handleSubmit = async (event) => {
    // Prevent form from being submitted to the server
    event.preventDefault();

    try {
      const user = await loginService(credentials);
      console.log(user);

      updateUser(user);

      navigate("/");
      
    } catch {
      setError("Log In Failed - Try Again");
    }
    
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
    <div className="row align-items-center g-lg-5 py-5">
      <div className="col-lg-7 text-center text-lg-start">
        <img src="" alt="meowstagram" />
      </div>
      <div className="col-md-10 mx-auto col-lg-5">
        <form onSubmit={handleSubmit} className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <p className="text-center pb-2">meowstagram</p>
          <div className="form-floating mb-3">
            <input value={credentials.email} onChange={handleChange} required name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input value={credentials.password} onChange={handleChange} required name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">LOG IN</button>
          <p className="error-message">&nbsp;{error}</p>
          <hr className="my-4" />
          <small className="text-body-secondary">Don't have an account? <Link to='/signup'>Sign Up</Link></small>
        </form>
      </div>
    </div>
  </div>
  );
}