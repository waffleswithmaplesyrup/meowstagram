import { useState } from "react";

//* pages
import AuthPage from "../AuthPage/AuthPage";
import LandingPage from "../LandingPage/LandingPage";

//* components
import NavBar from "../../components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import ErrorPage from "../ErrorPage/ErrorPage";


export default function App() {
  const data = { name: 'Simon', profilePic: 'simon.png'};

  const [user, setUser] = useState(null);
  
  return (
   <main>
    {
      user ? (
      <>
        <NavBar user={user}/>
        <LandingPage/>
      </> ) : (
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/' element={<AuthPage />} >
            <Route path='login' element={<LoginForm />} />
            <Route path='signup' element={<SignUpForm />} />
            <Route path='*' element={<ErrorPage />}/>
          </Route>
        </Routes>
      )
    }
    
    
   </main>
  );
}


