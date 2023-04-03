import React, { useState, useEffect } from "react";
import image from "../../../assets/71840.jpg";
import axios from "axios";
import "./Rightbar.css";
import Follow from "./Follow";
import { useSelector } from "react-redux";
import { useParams } from "react-router";


const Rightbar = () => {
  const user = useSelector((state) => state.currentUserReducer);
  const id = user?.result?._id;
  // const {id} = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `https://stackoverflow-server-9k5a.onrender.com/community/user/all/user/${id}`
        );
        setUsers(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, []);

  // console.log(users)

  return (
    <div className="rightbar">
      <div className="rightcontainer2">
        <h3 style={{ textAlign: "start", marginLeft: "10px" }}>
          Suggested for you
        </h3>
        {/* FIltering out logedin user */}
        {users
          .filter((user) => id !== user._id)
          .map((item) => (
            <Follow userdetails={item} key={item._id} />
          ))}
      </div>
      {/* <Explore /> */}
    </div>
  );
};

export default Rightbar;
