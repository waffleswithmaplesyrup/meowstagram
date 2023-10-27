import debug from "debug";

const log = debug("meowstagram:src:App");
localStorage.debug = "meowstagram:*";

log("Start React");

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

//* get user
import { getUser } from "../../utilities/users/users-service";

//* pages
import HomePage from "../HomePage/HomePage";
import SearchPage from "../SearchPage/SearchPage";
import CreatePage from "../CreatePage/CreatePage";
import DonatePage from "../DonatePage/DonatePage";
import AuthPage from "../AuthPage/AuthPage";
import LandingPage from "../LandingPage/LandingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import PostPage from "../PostPage/PostPage";


//* components
import NavBar from "../../components/NavBar/NavBar";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Footer from "../../components/Footer/Footer";


export default function App() {

  const [user, setUser] = useState(getUser());

  const updateUser = (update) => {
    setUser(update);
  };

  // console.log(user);

  return (
   <main className="d-flex justify-content-between">
    {
      user ? (
      <>
        <NavBar user={user} updateUser={updateUser}/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile/:username' element={<ProfilePage />} />
          <Route path='/profile/:username/:postID' element={<PostPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/donate' element={<DonatePage />} />
        </Routes>
      </> ) : (
        <Routes>
          {/* <Route path='/' element={<LandingPage />}/> */}
          <Route path='/' element={<AuthPage />} >
            <Route path='' element={<LoginForm updateUser={updateUser} />} />
            <Route path='login' element={<LoginForm updateUser={updateUser} />} />
            <Route path='signup' element={<SignUpForm updateUser={updateUser} />} />
            <Route path='*' element={<ErrorPage />}/>
          </Route>
        </Routes>
      )
    }
    {/* <Footer /> */}
    
    
   </main>
  );
}


