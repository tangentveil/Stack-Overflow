import React from "react";
import "./Post.css";
import { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import copy from "copy-to-clipboard";
import Avatar from "../../../components/Avatar";
import { allPosts } from "../../../actions/posts";

const Post = ({ post }) => {
  const users = useSelector((state) => state.currentUserReducer);
  const userId = users?.result?._id;
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const token = users?.token;
  const dispatch = useDispatch();

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/community/user/post/user/details/${post.user}` ||
            `https://stackoverflow-server-9k5a.onrender.com/community/user/post/user/details/${post.user}`
        );
        setUser(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, []);

  const [Like, setLike] = useState(
    post.like.includes(userId) ? anotherLikeIcon : LikeIcon
  );

  const [count, setCount] = useState(post.like.length);
  const [Comments, setComments] = useState(post.comments);
  const [commentWriting, setCommentWriting] = useState("");
  const [show, setShow] = useState(false);

  const handleLike = async () => {
    if (users) {
      if (Like == LikeIcon) {
        await fetch(
          `http://localhost:5000/community/posts/${post._id}/like` ||
            `https://stackoverflow-server-9k5a.onrender.com/community/posts/${post._id}/like`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/Json", token: token },
          }
        );
        setLike(anotherLikeIcon);
        setCount(count + 1);
      } else {
        await fetch(
          `http://localhost:5000/community/posts/${post._id}/dislike` ||
            `https://stackoverflow-server-9k5a.onrender.com/community/posts/${post._id}/dislike`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/Json", token: token },
          }
        );
        setLike(LikeIcon);
        setCount(count - 1);
      }
    } else {
      alert("Login to Like the POST");
    }
  };

  // console.log(post._id);
  // console.log(userId)

  const addComment = async () => {
    if (users) {
      const comment = {
        postId: `${post._id}`,
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
    } else {
      alert("Login to Comment on this POST");
    }
  };

  const handleComment = () => {
    addComment();
  };

  const handleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  // const location = useLocation();
  // const url = `http://localhost:5000/community/posts/user/post/${post._id}`;
  const url = `https://stackoverflow-server-9k5a.onrender.com/community/posts/user/post/${post._id}`;

  const handleShare = () => {
    copy(url);
    alert("Copied url : " + url);
  };

  const handleDelete = async () => {
    await fetch(
      `http://localhost:5000/community/posts/delete/post/${post._id}` ||
        `https://stackoverflow-server-9k5a.onrender.com/community/posts/delete/post/${post._id}`,
      {
        method: "DELETE",
      }
    ).then((data) => {
      alert("Your Post was deleted successfully");
      // window.location.reload(true);
      dispatch(allPosts());
    });
  };

  // console.log(allusers);

  return (
    <div className="PostContainer">
      <div className="SubPostContainer">
        <div className="post-heading">
          <Link to={`/Users/${post?._id}`} className="Avatar">
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
            <p style={{ marginLeft: "5px", textAlign: "start" }}>{user.name}</p>
          </div>
          {userId === post.user ? (
            <img
              src={`${trash}`}
              className="moreicons"
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
            marginTop: 0,
          }}
        >
          {post.title}
        </p>

        {post.image !== "" ? (
          <img src={`${post.image}`} className="PostImages" alt="" />
        ) : post.video !== "" ? (
          <video className="PostImages" width="500" height="500" controls>
            <source src={`${post.video}`} type="video/mp4" />
          </video>
        ) : (
          ""
        )}
        <div className="like-comment-share-div">
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
              <p style={{ marginLeft: "6px" }}>{count} Likes</p>
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
                onClick={handleShow}
                alt=""
              />
              <p style={{ marginLeft: "6px" }}>{Comments.length} Comments</p>
            </div>
          </div>
          <div className="shareIcon-div">
            <img
              src={`${shareIcon}`}
              className="iconsforPost"
              onClick={handleShare}
              alt=""
            />
            <p style={{ marginLeft: "6px" }}>Share</p>
          </div>
        </div>
        {show === true ? (
          <div style={{ padding: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={`${image}`} className="PostImage" alt="" />
              {/* <p style={{marginLeft:"6px"}}>Suman</p> */}
              <input
                type="text"
                className="commentinput"
                placeholder="Write your thought"
                onChange={(e) => setCommentWriting(e.target.value)}
              />
              <button className="addCommentbtn" onClick={handleComment}>
                Post
              </button>
            </div>
            {Comments.map((item) => (
              <div style={{ alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {item.profile === "" ? (
                    <img
                      src={`https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                      className="PostImage"
                      alt=""
                    />
                  ) : (
                    <img src={`${image}`} className="PostImage" alt="" />
                  )}
                  <p style={{ marginLeft: "6px", fontSize: 18, marginTop: 6 }}>
                    {item.name}
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
  );
};

export default Post;