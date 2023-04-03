import React, { useState,useEffect } from "react";
import axios from "axios";
import Avatar from "../../components/Avatar";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import './UserProfile.css'
import ProfileRightbar from "../Community/ProfileRightsideContainer/ProfileRightbar";

const UserProfile = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.currentUserReducer);

  const [users, setUsers] = useState([]);
  // console.log(users);

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
            `https://stackoverflow-server-9k5a.onrender.com/user/getAllUsers`
        );
        setUsers(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, []);


  const currentProfile = users.filter((user) => user._id === id)[0];
  // console.log(currentProfile)


  // console.log(currentUser)

  const [Switch, setSwitch] = useState(false);

  return (
    <div className="home-container-1">
      <div className="home-container-2">
        <section className="user-details-container">
          <div className="user-details">
            <Avatar
              backgroundColor="purple"
              color="white"
              fontSize="50px"
              px="13px"
              py="30px"
              className="user-details-Avatar"
            >
              {currentProfile?.name.charAt(0).toUpperCase()}
            </Avatar>
            <div className="user-name">
              <h1>{currentProfile?.name}</h1>
              <p>
                <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                {moment(currentProfile?.joinedOn).fromNow()}
              </p>
            </div>
          </div>
          {currentUser?.result?._id === id && (
            <button
              type="button"
              onClick={() => setSwitch(true)}
              className="edit-profile-btn"
            >
              <FontAwesomeIcon icon={faPen} /> Edit Profile
            </button>
          )}
        </section>

        <>
          {Switch ? (
            <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
          ) : (
            <ProfileBio currentProfile={currentProfile} />
          )}
        </>
      </div>
    </div>
  );
};

export default UserProfile;
