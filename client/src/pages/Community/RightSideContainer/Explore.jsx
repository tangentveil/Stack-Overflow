import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Explore.css";
import image from "../../../assets/71840.jpg";
import { useSelector } from "react-redux";

const Leftbar = () => {
  const user = useSelector((state) => state.currentUserReducer);
  let id = user?.result?._id;

  const post = useSelector((state) => state.postsReducer);

  // console.log(user)

  const token = user?.token;

  // console.log(token)

  // const [post, setPost] = useState([]);

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

  console.log(post);

  return (
    <div className="Leftbar">
      <div className="NotificationsContainer">
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p style={{ marginLeft: "-20px" }}>Explore</p>
          <p style={{ color: "#aaa", marginLeft: "40px" }}>See all</p>
        </div>
        <div>
          {post.map((item) => [
            item.image === "" ? (
              ""
            ) : (
              <img src={`${item.image}`} className="exploreimage" alt="" />
            ),
          ])}
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
