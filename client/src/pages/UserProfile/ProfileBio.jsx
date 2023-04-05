import MyPosts from "../../pages/Community/ProfileMainPostContainer/ProfileMainPost";
import Profile from "../Community/Profile/Profile";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileRightbar from "../Community/ProfileRightsideContainer/ProfileRightbar";
import Rightbar from "../Community/RightSideContainer/Rightbar";

const ProfileBio = ({ currentProfile }) => {
  // const { id } = useParams();
  // console.log(currentProfile._id)
  const id = currentProfile?._id;
  const user = useSelector((state) => state.currentUserReducer);
  const userId = user?.result?._id;
  const token = user?.token;

  // console.log(token);

  const [Follow, setUnFollow] = useState(
    user?.result?.Following.includes(id) ? "Unfollow" : "Follow"
  );

  let username = user?.result?.name;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
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
        `https://stackoverflow-server-9k5a.onrender.com/community/posts/following/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/JSON", token: token },
          body: JSON.stringify({ user: `${userId}` }),
        }
      );
      setUnFollow("Unfollow");
    } else {
      await fetch(
        `https://stackoverflow-server-9k5a.onrender.com/community/posts/following/${id}`,
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
    <>
      <div className="profile-bio-container">
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
              Following
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
          <div>
            {currentProfile?.tags.length !== 0 ? (
              <>
                <h4>Tags watched</h4>
                {currentProfile?.tags.map((tag) => {
                  return <p key={tag}>{tag}</p>;
                })}
              </>
            ) : (
              <p>0 Tags watched</p>
            )}
          </div>
          <div>
            {currentProfile?.about ? (
              <>
                <h4>About</h4>
                <p>{currentProfile?.about}</p>
              </>
            ) : (
              <p>No bio found</p>
            )}
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
            <div></div>
          )}
        </div>

        <Rightbar />

        <div>
          <ProfileRightbar />
        </div>
      </div>
      <Profile currentProfile={currentProfile} />
    </>
  );
};

export default ProfileBio;
