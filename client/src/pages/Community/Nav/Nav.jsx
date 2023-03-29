import React from 'react'
import { Link } from "react-router-dom";
import search from "../../../assets/search.svg";
import message from "../../../assets/message-solid.svg";
import notifications from "../../../assets/bell-solid.svg";
import image from '../../../assets/71840.jpg'

import './Nav.css'
import { useSelector } from 'react-redux';

const Nav = () => {

  const user = useSelector((state) => state.currentUserReducer);
  const id = user?.result?._id;
  // console.log(id)

  return (
    <div className="mainNavbar">
      <div className="LogoContainer">
        <p>Social</p>
      </div>
      <div>
        <div className="searchInputContainer">
          <img src={search} className='searchIcon' alt="" />
          <input
            type="text"
            className="searchInput"
            placeholder="search your friends"
            name=""
            id=""
          />
        </div>
      </div>
      <div className="IconsContainer">
        {/* Notifications and message logo */}
        <img src={`${notifications}`} className="Icons" alt="" />
        <img src={`${message}`} className="Icons" alt="" />
        <Link to={`/community/profile/${id}`}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={`${image}`} className="ProfileImage" alt="" />
            <p style={{ marginLeft: "5px" }}>{}</p>
          </div>
        </Link>
        <div
          style={{ marginRight: "30px", marginLeft: "20px", cursor: "pointer" }}
        >
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default Nav