import React from 'react'
import './Profile.css'
import ProfileMainPost from '../ProfileMainPostContainer/ProfileMainPost'
import { useSelector } from 'react-redux'

const Profile = ({currentProfile}) => {

  return (
    <div className="ProfileContainer">
      <div className="subProfileContainer">
        <ProfileMainPost currentProfile={currentProfile} />
      </div>
    </div>
  );
}

export default Profile