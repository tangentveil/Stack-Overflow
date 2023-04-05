import React from 'react'
import './MainPost.css'
import { useSelector } from "react-redux";

import ContentPost from '../ContentPostContainer/ContentPost'
import Post from '../PostContainer/Post'

const MainPost = () => {
  const post = useSelector((state) => state.postsReducer);
  const user = useSelector((state) => state.currentUserReducer);


  return (
    <div className="mainPostContainer">
      {user ? <ContentPost /> : ""}
      {post.map((item) => (
        <Post post={item} key={item._id} />
      ))}
    </div>
  );
}

export default MainPost