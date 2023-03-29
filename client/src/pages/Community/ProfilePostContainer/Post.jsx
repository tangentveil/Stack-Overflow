import React, { useState, useEffect } from "react";
import "./ProfilePost.css";
import axios from "axios";
import image from "../../../assets/71840.jpg";
import imageIcon from "../../../assets/image-solid.svg";
import videoIcon from "../../../assets/video-solid.svg";
import emojiIcon from "../../../assets/face-smile-solid.svg";
import shareIcon from "../../../assets/share.svg";
import commentIcon from "../../../assets/comment-solid.svg";
import LikeIcon from "../../../assets/unlike.svg";
import anotherLikeIcon from "../../../assets/like.svg";
import trash from "../../../assets/trash-solid.svg";
import { useSelector } from "react-redux";
import Avatar from "../../../components/Avatar";
import { Link } from "react-router-dom";

const Post = ({ detail }) => {
  const users = useSelector((state) => state.currentUserReducer);
  const userId = users?.result?._id;
  const token = users?.token;

  console.log(detail);

  const [count, setCount] = useState(detail.like.length);
  const [Comments, setComments] = useState(detail.comments);
  const [commentWriting, setCommentWriting] = useState("");
  const [show, setshow] = useState(false);

  const [Like, setLike] = useState(
    detail.like.includes(userId) ? anotherLikeIcon : LikeIcon
  );

  const [user, setuser] = useState([]);

  // console.log(detail.user)

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/community/user/post/user/details/${detail.user}` ||
            `https://stackoverflow-server-9k5a.onrender.com/community/user/post/user/details/${detail.user}`
        );
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, []);

  const handleLike = async () => {
    if (Like === LikeIcon) {
      await fetch(
        `http://localhost:5000/community/posts/${detail._id}/like` ||
          `https://stackoverflow-server-9k5a.onrender.com/community/posts/${detail._id}/like`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/Json", token: token },
        }
      );
      setLike(anotherLikeIcon);
      setCount(count + 1);
    } else {
      await fetch(
        `http://localhost:5000/community/posts/${detail._id}/dislike` ||
          `https://stackoverflow-server-9k5a.onrender.com/community/posts/${detail._id}/dislike`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/Json", token: token },
        }
      );
      setLike(LikeIcon);
      setCount(count - 1);
    }
  };

  const addComment = async () => {
    const comment = {
      postId: `${detail._id}`,
      name: `${users?.result?.name}`,
      comment: `${commentWriting}`,
    };

    await fetch(
      `http://localhost:5000/community/posts/comment/post` ||
        `https://stackoverflow-server-9k5a.onrender.com/community/posts/comment/post`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/Json", token: token },
        body: JSON.stringify(comment),
      }
    );
    setComments(Comments.concat(comment));
  };

  const handleComment = () => {
    addComment();
  };

  //  console.log(Comments);

  const handleshow = () => {
    if (show === false) {
      setshow(true);
    } else {
      setshow(false);
    }
  };
  //  console.log(detail.like.length);

  const handleDelete = async () => {
    await fetch(
      `http://localhost:5000/community/posts/delete/post/${detail._id}` ||
        `https://stackoverflow-server-9k5a.onrender.com/community/posts/delete/post/${detail._id}`,
      {
        method: "DELETE",
      }
    ).then((data) => {
      alert("Your Post was deleted successfully");
      window.location.reload(true);
    });
  };

  return (
    <div className="profile-PostContainer">
      <div className="profile-SubPostContainer">
        <div className="profile-post-div">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to={`/Users/${users?.result?._id}`} className="Avatar">
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="16px"
                borderRadius="50%"
                color="white"
                fontSize="14px"
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
            </Link>

            <div>
              <p style={{ marginLeft: "5px", textAlign: "start" }}>
                {user.name}
              </p>
            </div>
            {userId === detail.user ? (
              <img
                src={`${trash}`}
                className="profile-moreicons"
                alt=""
                onClick={handleDelete}
              />
            ) : (
              " "
            )}
          </div>
          <p
            style={{
              textAlign: "start",
              width: "96%",
              marginLeft: 20,
              marginTop: 20,
            }}
          >
            {detail.title}
          </p>
          {detail.image !== "" ? (
            <img
              src={`${detail.image}`}
              className="profile-PostImages"
              alt=""
            />
          ) : detail.video !== "" ? (
            <video className="PostImages" width="500" height="500" controls>
              <source src={`${detail.video}`} type="video/mp4" />
            </video>
          ) : (
            ""
          )}
          <div className="profile-like-comment-share-div">
            <div style={{ display: "flex", marginLeft: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src={`${Like}`}
                  className="iconsforPost"
                  onClick={handleLike}
                  alt=""
                />
                <p style={{ marginLeft: "6px" }}>{detail.like.length} Likes</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 20,
                  cursor: "pointer",
                }}
              >
                <img
                  src={`${commentIcon}`}
                  className="iconsforPost"
                  onClick={handleshow}
                  alt=""
                />
                <p style={{ marginLeft: "6px" }}>
                  {detail.comments.length} Comments
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img src={`${shareIcon}`} className="iconsforPost" alt="" />
              <p style={{ marginLeft: "6px" }}>Share</p>
            </div>
          </div>
          {show === true ? (
            <div style={{ padding: "10px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link to={`/Users/${user?.result?._id}`} className="Avatar">
                  <Avatar
                    backgroundColor="#009dff"
                    px="10px"
                    py="16px"
                    borderRadius="50%"
                    color="white"
                    fontSize="14px"
                  >
                    {users?.result?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </Link>
                {/* <p style={{marginLeft:"6px"}}>Suman</p> */}
                <input
                  type="text"
                  className="commentinput"
                  placeholder="Write your thought"
                  onChange={(e) => setCommentWriting(e.target.value)}
                />
                <button
                  className="profile-addCommentbtn"
                  onClick={handleComment}
                >
                  Post
                </button>
              </div>
              {Comments.map((item) => (
                <div style={{ alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={`${image}`} className="PostImage" alt="" />
                    <p
                      style={{ marginLeft: "6px", fontSize: 18, marginTop: 6 }}
                    >
                      {item.username}
                    </p>
                  </div>
                  <p
                    style={{
                      marginLeft: "55px",
                      textAlign: "start",
                      marginTop: -16,
                    }}
                  >
                    {item.comment}
                  </p>
                  <p
                    style={{
                      marginLeft: "55px",
                      textAlign: "start",
                      marginTop: -10,
                      color: "#aaa",
                      fontSize: 11,
                    }}
                  >
                    Reply
                  </p>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
