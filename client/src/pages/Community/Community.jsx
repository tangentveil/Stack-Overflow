import React, {useEffect} from "react";
import "./Community.css";
import MainPost from "./MainPostContainer/MainPost";
import Rightbar from './RightSideContainer/Rightbar'

import { allPosts } from "../../actions/posts";
import { useDispatch } from "react-redux";

const Community = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(allPosts());
  },[dispatch])

  return (
    <div className="home-container-1">
      <div className="home-container-2">
        <div className="ComponentContainer">
        <MainPost />
        </div>
      </div>
    </div>
  );
};

export default Community;
