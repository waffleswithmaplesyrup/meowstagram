import { useState } from "react";
import { Routes, Route } from "react-router-dom";


//* pages
import HomePage from "../HomePage/HomePage";
import ProfilePage from "../ProfilePage/ProfilePage";
import SearchPage from "../SearchPage/SearchPage";
import CreatePage from "../CreatePage/CreatePage";
import DonatePage from "../DonatePage/DonatePage";
import AuthPage from "../AuthPage/AuthPage";
import LandingPage from "../LandingPage/LandingPage";
import ErrorPage from "../ErrorPage/ErrorPage";


//* components
import NavBar from "../../components/NavBar/NavBar";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Footer from "../../components/Footer/Footer";


export default function App() {
  const data = { name: 'Simon', profilePic: 'simon.png'};

  const [user, setUser] = useState(data);
  
  return (
   <main>
    {
      user ? (
      <>
        <NavBar user={user}/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/donate' element={<DonatePage />} />
        </Routes>
      </> ) : (
        <Routes>
          {/* <Route path='/' element={<LandingPage />}/> */}
          <Route path='/' element={<AuthPage />} >
            <Route path='' element={<LoginForm />} />
            <Route path='login' element={<LoginForm />} />
            <Route path='signup' element={<SignUpForm />} />
            <Route path='*' element={<ErrorPage />}/>
          </Route>
        </Routes>
      )
    }
    <Footer />
    
    
   </main>
  );
}


