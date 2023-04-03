import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo-stackoverflow.png";
import search from "../assets/search.svg";
import Avatar from "../components/Avatar";
import Button from "../components/Avatar";
import { setCurrentUser } from "../actions/currentUser";
import decode from "jwt-decode";
import menu from "../assets/bars-solid.svg";
import { NavLink } from "react-router-dom";
import Globe from "../assets/Globe.svg";
import cross from "../assets/xmark-solid.svg";

const Navbar = () => {
  // useSelector hook -> to get the user data anywhere in the application from the redux
  // currentUserReducer -> from reducers
  // setCurrentUser(actions) -> currentUserReducer(redeucers) -> useSelector

  const User = useSelector((state) => state.currentUserReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    dispatch(setCurrentUser(null));
    navigate("/");
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

  // responsive sidebar
  const [sidebar, setSidebar] = useState(false);
  const [sidebarIcon, setSidebarIcon] = useState(menu);

  const handleClick = () => {
    if (!sidebar) {
      setSidebar(true);
      setSidebarIcon(cross);
    } else {
      setSidebar(false);
      setSidebarIcon(menu);
    }
  };

  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (User) {
      setShowPayment(true);
    } else {
      setShowPayment(false);
    }
  }, [User]);

  return (
    <div className="header">
      <div>
        {sidebar ? (
          <div className="left-sidebar">
            <nav className="side-nav">
              {/* <img src={menu} width={20} alt="" /> */}
              <NavLink
                to="/"
                className="side-nav-links"
                activeclassname="active"
              >
                <p style={{ marginBottom: "14px", marginTop: "14px" }}>Home</p>
              </NavLink>
              <div className="side-nav-div">
                <div>
                  <p style={{ marginBottom: "14px", marginTop: "14px" }}>
                    PUBLIC
                  </p>
                </div>
                <NavLink
                  to="/Questions"
                  className="side-nav-links"
                  activeclassname="active"
                >
                  <img src={Globe} alt="Globe" width={18} />
                  <p style={{ paddingLeft: "10px" }}>Questions</p>
                </NavLink>

                <NavLink
                  to="/Tags"
                  className="side-nav-links"
                  activeclassname="active"
                  style={{ paddingLeft: "40px" }}
                >
                  <p style={{ paddingLeft: "10px" }}>Tags</p>
                </NavLink>

                <NavLink
                  to="/Users"
                  className="side-nav-links"
                  activeclassname="active"
                  style={{ paddingLeft: "40px" }}
                >
                  <p style={{ paddingLeft: "10px" }}>Users</p>
                </NavLink>

                <NavLink
                  to="/chat"
                  className="side-nav-links"
                  activeclassname="active"
                  style={{ paddingLeft: "40px" }}
                >
                  <p style={{ paddingLeft: "10px" }}>Chat Bot</p>
                </NavLink>

                {showPayment ? (
                  <NavLink
                    to="/payment"
                    className="side-nav-links"
                    activeclassname="active"
                    style={{ paddingLeft: "40px" }}
                  >
                    <p style={{ paddingLeft: "10px" }}>Payment</p>
                  </NavLink>
                ) : (
                  ""
                )}

                <NavLink
                  to="/community"
                  className="side-nav-links"
                  activeclassname="active"
                  style={{ paddingLeft: "40px" }}
                >
                  <p style={{ paddingLeft: "10px" }}>Community</p>
                </NavLink>
              </div>
            </nav>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <nav className="main-nav">
        <div className="navbar">
          <img
            src={sidebarIcon}
            width={20}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
            alt=""
          />
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
                  py="16px"
                  borderRadius="50%"
                  color="white"
                  fontSize="14px"
                >
                  {User?.result?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </Link>
              <button className="nav-item nav-links" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
