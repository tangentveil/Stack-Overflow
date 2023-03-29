import React from 'react'
import './MainPost.css'
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContentPost from '../ContentPostContainer/ContentPost'
import Post from '../PostContainer/Post'
import { useParams } from 'react-router';
import {allPosts} from '../../../actions/posts.js'

const MainPost = () => {

  const user = useSelector((state) => state.currentUserReducer);
  const id = user?.result?._id;
  const dispatch = useDispatch();

  // const localuser = JSON.parse(localStorage.getItem("Profile"));

  // console.log(localuser?.result?._id)

  // const id = localuser?.result?._id;

// const {id} = useParams();

  // console.log(id)
  // dispatch(allPosts());

  const token = user?.token;

  const post = useSelector((state) => state.postsReducer);

  // console.log(post)

  // useEffect(() => {
  //   const getPost = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:5000/community/posts/AllPosts`
  //       );
  //       setPost(res.data);
  //     } catch (error) {}
  //   };
  //   getPost();
  // }, []);

  // useEffect(() => {
  //   const getPost = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:5000/community/user/flw/${id}`,
  //         {
  //           headers: {
  //             token: token,
  //           },
  //         }
  //       );
  //       setPost(res.data);
  //     } catch (error) {}
  //   };
  //   getPost();
  // }, []);

  // console.log(post);

  return (
    <div className="mainPostContainer">
      <ContentPost />
      {/* <Post/> */}
      {post.map((item) => (
        <Post post={item} key={item._id} />
      ))}
    </div>
  );
}

export default MainPost