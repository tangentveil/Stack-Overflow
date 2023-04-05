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
            `https://stackoverflow-server-9k5a.onrender.com/community/posts/followers/${id}`
        );
        setFollowinguser(res.data);
      } catch (error) {
        console.log("Error");
      }
    };
    getFollowing();
  }, []);

  console.log(Followinguser);

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
                    py="15px"
                    borderRadius="50%"
                    color="white"
                    fontSize="14px"
                  >
                    {item?.name?.charAt(0).toUpperCase()}
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
    </div>
  );
};

export default ProfileRightbar;
