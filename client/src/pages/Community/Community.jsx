import React, {useEffect} from "react";
import "./Community.css";
import Nav from "../Community/Nav/Nav";
import MainPost from "./MainPostContainer/MainPost";
import Rightbar from './RightSideContainer/Rightbar'
import LeftSidebar from '../../components/LeftSidebar'
import Profile from "./Profile/Profile";
import { useSelector } from "react-redux";
import { allPosts } from "../../actions/posts";
import { useDispatch } from "react-redux";

const Community = () => {

  const user = useSelector(state => state.currentUserReducer);
  // console.log(user)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(allPosts());
  },[dispatch])

  return (
    // <div className="home">
    //   <Nav />
    //   <div className="ComponentContainer">
    //     <MainPost />
    //     <Rightbar />
    //   </div>
    //   {/* <Profile/> */}
    // </div>

    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <div className="ComponentContainer">
        <MainPost />
        <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default Community;
