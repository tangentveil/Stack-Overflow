import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import "./Users.css";
import { userPosts } from '../actions/userPosts';
import { useDispatch } from 'react-redux';

const User = ({user}) => {
  return (
    <Link to={`/Users/${user._id}`} className='user-profile-link'>
        <h3>{user?.name?.charAt(0).toUpperCase()}</h3>
        <h5>{user.name}</h5>
    </Link>
  )
}

export default User