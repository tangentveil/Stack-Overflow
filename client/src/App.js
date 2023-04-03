// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Questions from "./pages/Questions";
import AskQuestion from "./pages/AskQuestion";
import DisplayQuestion from "./pages/DisplayQuestion";
import { useEffect, useState } from "react";
import { fetchAllQuestions } from "./actions/AskQuestion";
import { useDispatch } from "react-redux";
import Tags from "./pages/Tags/Tags";
import Users from './pages/Users'
import { fetchAllUsers } from "./actions/users";
import { allPosts } from "./actions/posts";
import UserProfile from "./pages/UserProfile/UserProfile";
import Chat from "./pages/ChatBot/Chat";
import Payment from "./pages/Payment/Payment";
import Community from "./pages/Community/Community";


function App() {
  const dispatch = useDispatch();

  // another dispatch(fetchAllQuestions()); used in actions/AskQuestion.js

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
