import React from 'react'
import './Profile.css'
import Nav from '../Nav/Nav'
import ProfileLeftbar from '../ProfileLeftSideContainer/ProfileLeftbar'
import ProfileMainPost from '../ProfileMainPostContainer/ProfileMainPost'
import ProfileRightbar from '../ProfileRightsideContainer/ProfileRightbar'
import { useSelector } from 'react-redux'

const Profile = ({currentProfile}) => {

  const user = useSelector((state) => state.currentUserReducer);
  

  return (
    <div className="ProfileContainer">
      <div className="subProfileContainer">
        {/* <ProfileLeftbar /> */}
        <ProfileMainPost currentProfile={currentProfile} />
        {/* <ProfileRightbar/> */}
      </div>
    </div>
  );
}

export default Profile