import React, { useEffect, useState } from "react";
import ContentPost from "../ContentPostContainer/ContentPost";
import axios from "axios";
import "./ProfileMainPost.css";
import Post from "../ProfilePostContainer/Post";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { allPosts } from "../../../actions/posts";
import { userPosts } from "../../../actions/userPosts";

const ProfileMainPost = ({ currentProfile }) => {
  const user = useSelector((state) => state.currentUserReducer);
  const userId = user?.result?._id
  const { id } = useParams();

  // console.log(userId)

  const dispatch = useDispatch();

  const post = useSelector((state) => state.userpostsReducer);

  useEffect(() => {
    dispatch(userPosts(id));
  }, [dispatch]);

  return (
    <div className="ProfilemainPostContainer">
      <div>
        <h2
          style={{
            marginTop: 10,
            color: "black",
            textAlign: "start",
          }}
        >
          Posts
        </h2>
      </div>
      {userId === id ? <ContentPost currentProfile={currentProfile} /> : ""}

      {post.map((item) => (
        <Post detail={item} key={item._id} />
      ))}
    </div>
  );
};

export default ProfileMainPost;
