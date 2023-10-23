import { useState } from "react";
import { Link } from "react-router-dom";
// import { login } from "../../utilities/users-service";

export default function LoginForm({ updateUser }) {
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
      const user = await login(credentials);
      console.log(user);

      updateUser(user);
      
    } catch {
      setError("Log In Failed - Try Again");
    }
    
  };

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
      <p>No account? <Link to='/signup'>Sign Up</Link></p>
    </div>
  );
}