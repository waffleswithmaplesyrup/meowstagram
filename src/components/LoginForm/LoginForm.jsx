import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

import { loginService } from "../../utilities/users/users-service";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";

export default function LoginForm({ updateUser }) {
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);

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
    event.preventDefault();
    setStatus("loading");

    try {
      const user = await loginService(credentials);

      updateUser(user);

      Swal.fire(swalBasicSettings("Logged in successfully!", "success"));
      
      navigate("/");
      
    } catch (err) {
      if (err.message === "Unexpected end of JSON input") {
        Swal.fire({
          ...swalBasicSettings("Internal Server Error", "error"),
          text: "Please try again later.",
        });
      } else {
        Swal.fire({
          ...swalBasicSettings("Error", "error"),
          text: err.message,
          confirmButtonText: "Try Again",
        });
      }
      setStatus("error");
    } finally {
      setStatus("success");
    }
    
  };

  if (status === 'loading') {
    return <div className="d-flex col justify-content-center align-items-center" style={{height: "100vh"}}>
    <ReactLoading type="spin" color="#67E8B5" height={100} width={50} />
    <p>Loading...</p>
    </div>
  }

  const disable = (credentials.password.length < 3) || (credentials.email.length < 3);

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5" style={{height: "100vh"}}>
    <div className="row align-items-center g-lg-5 py-5">
      <div className="col-lg-7 text-center text-lg-start d-flex justify-content-center">
        <img src="/assets/pic-auth.png" alt="meowstagram" className="pic-auth"/>
      </div>
      <div className="col-md-10 mx-auto col-lg-5">
        <form onSubmit={handleSubmit} className="p-5 p-md-5 " style={{border: "2px solid #8D8585", borderRadius: "5px"}}>
          <img src="/assets/logo-auth.png" alt="meowstagram" className="logo-auth" />
          <div className="form-floating mb-3">
            <input value={credentials.email} onChange={handleChange} required name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input value={credentials.password} onChange={handleChange} required name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 form-control default-button" type="submit" disabled={disable}>LOG IN</button>
          <p className="error-message">&nbsp;{error}</p>
          <hr className="my-4" />
          <small className="text-body-secondary">Don't have an account? <Link to='/signup' className="default-link">Sign Up</Link></small>
        </form>
      </div>
    </div>
  </div>
  );
}