import React, { useState, useEffect } from "react";
import "./Profileleftbar.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import image from "../../../assets/71840.jpg";
import { useSelector } from "react-redux";

const ProfileLeftbar = ({ currentProfile }) => {
  const { id } = useParams();
  // console.log(id);
  const user = useSelector((state) => state.currentUserReducer);
  const userId = user?.result?._id;
  const token = user?.token;

  // console.log(token)

  const [Follow, setUnFollow] = useState([
    user?.result?.Following.includes(id) ? "Unfollow" : "Follow",
  ]);

  let username = user?.result?.name;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/community/user/post/user/details/${id}` ||
            `https://stackoverflow-server-9k5a.onrender.com/community/user/post/user/details/${id}`
        );
        setUsers(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, []);

  // console.log(users)

  let followersCounter = users?.Followers?.length;
  let followingCounter = users?.Following?.length;

  const [Followinguser, setFollowinguser] = useState([]);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/community/posts/following/${id}` ||
            `https://stackoverflow-server-9k5a.onrender.com/community/posts/following/${id}`
        );
        setFollowinguser(res.data);
      } catch (error) {
        console.log("Error");
      }
    };
    getFollowing();
  }, []);

  const handleFollow = async (e) => {
    if (Follow === "Follow") {
      await fetch(
        `http://localhost:5000/community/user/following/${id}` ||
          `https://stackoverflow-server-9k5a.onrender.com/community/user/following/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/JSON", token: token },
          body: JSON.stringify({ user: `${userId}` }),
        }
      );
      setUnFollow("UnFollow");
    } else {
      await fetch(
        `http://localhost:5000/community/user/following/${id}` ||
          `https://stackoverflow-server-9k5a.onrender.com/community/user/following/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/JSON", token: token },
          body: JSON.stringify({ user: `${userId}` }),
        }
      );
      setUnFollow("Follow");
    }
  };

  return (
    <div className="ProfileLeftbar">
      <div className="NotificationsContainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>
            Followers
          </p>
          <p
            style={{
              color: "black",
              marginRight: 20,
              fontSize: "12px",
              marginTop: 10,
            }}
          >
            {followingCounter}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -20,
          }}
        >
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>
            Followers
          </p>
          <p
            style={{
              color: "black",
              marginRight: 20,
              fontSize: "12px",
              marginTop: 10,
            }}
          >
            {followersCounter}
          </p>
        </div>
        <div style={{ marginTop: -20 }}>
          <h5
            style={{
              color: "black",
              marginLeft: 10,
              fontSize: "14px",
              marginRight: 30,
              marginTop: 30,
              textAlign: "start",
            }}
          >
            User bio
          </h5>
          <p
            style={{
              color: "black",
              fontSize: "12px",
              marginTop: -20,
              textAlign: "start",
              marginLeft: "10px",
            }}
          >
            I would rather be despised of who I am, rather than loved by who I
            am not.
          </p>
        </div>
        {user?.result?._id !== id ? (
          <div onClick={handleFollow}>
            <button
              style={{
                width: "100%",
                paddingTop: 7,
                paddingBottom: 7,
                border: "none",
                backgroundColor: "green",
                color: "white",
              }}
            >
              {Follow}
            </button>
          </div>
        ) : (
          <div>
            <button
              style={{
                width: "100%",
                paddingTop: 7,
                paddingBottom: 7,
                border: "none",
                backgroundColor: "green",
                color: "white",
              }}
            >
              Edit Bio
            </button>
          </div>
        )}
      </div>

      {/* <div className="NotificationsContainer">
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
      </div> */}
    </div>
  );
};

export default ProfileLeftbar;
