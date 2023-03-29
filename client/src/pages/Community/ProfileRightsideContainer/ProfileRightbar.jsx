import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfileRightbar.css";
import image from "../../../assets/71840.jpg";
import Follow from "../RightSideContainer/Follow";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Avatar from "../../../components/Avatar";

const ProfileRightbar = () => {
  const { id } = useParams();
  // console.log(id);
  const user = useSelector((state) => state.currentUserReducer);
  const userId = user?.result?._id;

  const [Followinguser, setFollowinguser] = useState([]);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/community/posts/followers/${id}` ||
            `https://stackoverflow-server-9k5a.onrender.com/community/posts/followers/${id}`
        );
        setFollowinguser(res.data);
      } catch (error) {
        console.log("Error");
      }
    };
    getFollowing();
  }, []);

  // console.log(Followinguser);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/community/user/all/user/${userId}` ||
            `https://stackoverflow-server-9k5a.onrender.com/community/user/all/user/${userId}`
        );
        setUsers(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, []);

  // console.log(users);

  return (
    <div className="Profilerightbar">
      <div className="profilerightcontainer">
        <h3>Followers</h3>
        <div>
          {Followinguser.map((item) => (
            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 10,
                  cursor: "pointer",
                }}
              >
                <Link to={`/Users/${item?._id}`} className="Avatar">
                  <Avatar
                    backgroundColor="#009dff"
                    px="10px"
                    py="16px"
                    borderRadius="50%"
                    color="white"
                    fontSize="14px"
                  >
                    {item?.name}
                  </Avatar>
                </Link>
                <p style={{ textAlign: "start", marginLeft: "10px" }}>
                  {item.name}{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="NotificationsContainer">
        <h3>Followings</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ marginLeft: 10 }}>Friends</p>
          <p style={{ marginRight: 10, color: "#aaa" }}>See all</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", marginLeft: 5 }}>
          {Followinguser.map((item) => (
            <Link to={`/community/profile/${item._id}`}>
              <div style={{ marginLeft: 4, cursor: "pointer" }} key={item._id}>
                <img src={`${image}`} className="friendimage" alt="" />
                <p style={{ marginTop: -2 }}>{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* <div className="rightcontainer2">
        <h3 style={{ textAlign: "start", marginLeft: "10px" }}>
          Suggested for you
        </h3>
        {users.map((item) => (
          <Follow userdetails={item} key={item._id} />
        ))}
      </div> */}
    </div>
  );
};

export default ProfileRightbar;
