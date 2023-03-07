import React, { useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo-stackoverflow.png";
import search from "../assets/search.svg";
import Avatar from "../components/Avatar";
import Button from "../components/Avatar";
import { setCurrentUser } from "../actions/currentUser";
import decode from 'jwt-decode'

const Navbar = () => {
  // useSelector hook -> to get the user data anywhere in the application from the redux
  // currentUserReducer -> from reducers
  // setCurrentUser(actions) -> currentUserReducer(redeucers) -> useSelector

  var User = useSelector((state) => state.currentUserReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };
  
  // rendering on every refresh, so user icon won't disappear
  useEffect(() => {

    // auto logout in 1 hour
    const token = User?.token
    if(token){
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()){
        handleLogout()
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);

  return (
    <nav className="main-nav">
      <div className="navbar">
        <Link to="/" className="nav-item nav-logo">
          <img src={logo} alt="logo" width={170} />
        </Link>

        <Link to="/" className="nav-item nav-btn">
          About
        </Link>

        <Link to="/" className="nav-item nav-btn">
          Product
        </Link>

        <Link to="/" className="nav-item nav-btn">
          For Teams
        </Link>

        <form>
          <input type="text" placeholder="Search..." />
          <img src={search} alt="" width={18} className="search-icon" />
        </form>

        {User === null ? (
          <Link to="/Auth" className="nav-item nav-links">
            Log in
          </Link>
        ) : (
          <>
            <Link to={`/Users/${User?.result?._id}`} className="Avatar">
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="15px"
                borderRadius="50%"
                color="white"
                fontSize="16px"
              >
                {User.result.name.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
            <button className="nav-item nav-links" onClick={handleLogout}>
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
