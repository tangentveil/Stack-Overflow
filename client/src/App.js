// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import decode from "jwt-decode";

import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Questions from "./pages/Questions";
import AskQuestion from "./pages/AskQuestion";
import DisplayQuestion from "./pages/DisplayQuestion";
import { useEffect, useState } from "react";
import { fetchAllQuestions } from "./actions/AskQuestion";
import { useDispatch, useSelector } from "react-redux";
import Tags from "./pages/Tags/Tags";
import Users from './pages/Users'
import { allPosts } from "./actions/posts";
import UserProfile from "./pages/UserProfile/UserProfile";
import Chat from "./pages/ChatBot/Chat";
import Payment from "./pages/Payment/Payment";
import Community from "./pages/Community/Community";
import { setCurrentUser } from "./actions/currentUser";


function App() {
  const User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();

  // another dispatch(fetchAllQuestions()); used in actions/AskQuestion.js
  const handleLogout = () => {
    localStorage.clear();
    dispatch(setCurrentUser(null));
  };

  // rendering on every refresh, so user icon won't disappear
  useEffect(() => {
    // auto logout in 1 hour
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(allPosts());
    // dispatch(fetchAllUsers())
    // dispatch(setCurrentUser())
  }, [dispatch]);

  const [sidebar, setSidebar] = useState(false);

  const side = (data) => {
    setSidebar(data);
  }

  return (
    <div className="App">
      <Router>
        <Navbar side={side} />
        <Routes>
          <Route path="/" element={<Home sidebar={sidebar} />}></Route>
          <Route path="/Auth" element={<Auth />}></Route>
          <Route path="/Questions" element={<Questions />}></Route>
          <Route path="/AskQuestion" element={<AskQuestion />}></Route>
          <Route path="/Questions/:id" element={<DisplayQuestion />}></Route>
          <Route path="/Tags" element={<Tags />}></Route>
          <Route path="/Users" element={<Users />}></Route>
          <Route path="/Users/:id" element={<UserProfile />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/community" element={<Community />}></Route>
          {/* <Route path="/Users/:id" element={<UserProfile />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
