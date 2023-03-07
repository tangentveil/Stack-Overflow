import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Questions from "./pages/Questions";
import AskQuestion from "./pages/AskQuestion";
import DisplayQuestion from "./pages/DisplayQuestion";
import { useEffect } from "react";
import { fetchAllQuestions } from "./actions/AskQuestion";
import { useDispatch } from "react-redux";
import Tags from "./pages/Tags/Tags";
import Users from './pages/Users'
import { fetchAllUsers } from "./actions/users";
import UserProfile from "./pages/UserProfile/UserProfile";

function App() {
  const dispatch = useDispatch();

  // another dispatch(fetchAllQuestions()); used in actions/AskQuestion.js

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers())
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Auth" element={<Auth />}></Route>
          <Route path="/Questions" element={<Questions />}></Route>
          <Route path="/AskQuestion" element={<AskQuestion />}></Route>
          <Route path="/Questions/:id" element={<DisplayQuestion />}></Route>
          <Route path="/Tags" element={<Tags />}></Route>
          <Route path="/Users" element={<Users />}></Route>
          <Route path="/Users/:id" element={<UserProfile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
