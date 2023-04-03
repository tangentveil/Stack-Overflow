import React from "react";
import "./Users.css";
import { useLocation } from "react-router-dom";
import UsersList from "./UsersList";

const Users = () => {
  return (
    <>
      <div className="home-container-1">
        <div className="home-container-2" style={{margin
        :"30px"}}>
          <h1 style={{fontWeight:"400"}}>Users</h1>
          {/* <div>
            <input type="text" />
            <button type="submit">Search</button>
          </div> */}
          <UsersList />
        </div>
      </div>
    </>
  );
};

export default Users;
