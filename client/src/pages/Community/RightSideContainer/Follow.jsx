import React, { useState } from "react";
import { Link } from "react-router-dom";
import addFriends from "../../../assets/user-plus-solid.svg";
import UserToFollow from "../../../assets/user-check-solid.svg";
import image from "../../../assets/71840.jpg";
import { useSelector } from "react-redux";

const Follow = ({ userdetails }) => {
  // console.log(userdetails)
  const user = useSelector((state) => state.currentUserReducer);
  const id = user?.result?._id;

  const [Follow, setFollow] = useState(addFriends);

  const token = user?.token;
  // console.log(token)

  // console.log(userdetails._id)
  // console.log(id)

  const handleFollow = async (e) => {
    await fetch(
      `https://stackoverflow-server-9k5a.onrender.com/community/user/following/${userdetails._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/JSON", token: token },
        body: JSON.stringify({ user: `${id}` }),
      }
    );

    if (id !== userdetails._id) {
      setFollow(UserToFollow);
    }
  };

  return (
    <div style={{ marginTop: "-10px" }} key={userdetails._id}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to={`Users/${userdetails._id}`}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={`${image}`} className="Profileimage" alt="" />
            <div>
              <p style={{ marginLeft: "10px", textAlign: "start" }}>
                {userdetails.name}
              </p>
              <p
                style={{
                  marginLeft: "10px",
                  textAlign: "start",
                  marginTop: "-16px",
                  fontSize: "11px",
                  color: "#aaa",
                }}
              >
                Suggested for you
              </p>
            </div>
          </div>
        </Link>
        <div
          style={{
            backgroundColor: "#aaa",
            padding: "10px",
            marginRight: 13,
            borderRadius: "50%",
            cursor: "pointer",
          }}
          onClick={(e) => handleFollow(userdetails._id)}
        >
          <img src={`${Follow}`} className="addfriend" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Follow;
