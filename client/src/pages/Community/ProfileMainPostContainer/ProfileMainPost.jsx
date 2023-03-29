import React, { useEffect, useState } from "react";
import ContentPost from "../ContentPostContainer/ContentPost";
import axios from "axios";
import image from "../../../assets/71840.jpg";
import "./ProfileMainPost.css";
import Post from "../ProfilePostContainer/Post";
import { useParams } from "react-router";

const ProfileMainPost = ({currentProfile}) => {
  const { id } = useParams();
  // console.log(id);
  const [post, setPost] = useState([]);
  
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/community/posts/get/post/${id}` ||
            `https://stackoverflow-server-9k5a.onrender.com/community/posts/get/post/${id}`
        );
        setPost(res.data);
      } catch (error) {
        console.log("error occured");
      }
    };
    getPost();
  }, []);

  // console.log(post);

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
      <ContentPost currentProfile={currentProfile} />
      {post.map((item) => (
        <Post detail={item} key={item._id} />
      ))}
    </div>
  );
};

export default ProfileMainPost;
