import React from "react";
import "./Post.css";
import { useState, useEffect } from "react";
import axios from "axios";
import shareIcon from "../../../assets/share.svg";
import commentIcon from "../../../assets/comment-solid.svg";
import LikeIcon from "../../../assets/unlike.svg";
import anotherLikeIcon from "../../../assets/like.svg";
import trash from "../../../assets/trash-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import copy from "copy-to-clipboard";
import Avatar from "../../../components/Avatar";
import { allPosts } from "../../../actions/posts";
import { userPosts } from "../../../actions/userPosts";

const Post = ({ post }) => {
  console.log('post details :',post)
  const users = useSelector((state) => state.currentUserReducer);
  const userId = users?.result?._id;
  const [user, setUser] = useState('');
  const token = users?.token;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userPosts(post._id));
  }, [dispatch]);

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
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

  const url = window.location.href;

  // console.log(url);

  const handleShare = () => {
    copy(url);
    alert("Copied url : " + url);
  };

  const handleDelete = async () => {
    await fetch(
      `https://stackoverflow-server-9k5a.onrender.com/community/posts/delete/post/${post?._id}`,
      {
        method: "DELETE",
      }
    ).then((data) => {
      alert("Your Post was deleted successfully");
      dispatch(allPosts());
    });
  };

  // console.log(allusers);

  return (
    <div className="PostContainer">
      <div className="SubPostContainer">
        <div className="post-heading">
          <div className="like-comment-share-div">
            <div style={{ display: "flex", marginLeft: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Link to={`/Users/${post?.user}`} className="Avatar">
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
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 20,
                  cursor: "pointer",
                }}
              >
                <p style={{ marginLeft: "5px", textAlign: "start" }}>
                  {user.name}
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
              {userId === post.user ? (
                <>
                  <img
                    src={`${trash}`}
                    className="profile-moreicons"
                    alt=""
                    onClick={handleDelete}
                  />
                  <p style={{ marginLeft: "6px", marginTop: "1rem" }}>Delete</p>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
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
              <p style={{ marginLeft: "6px", marginTop: 0 }}>{count} Likes</p>
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
              <p style={{ marginLeft: "6px", marginTop: 0 }}>
                {Comments.length} Comments
              </p>
            </div>
          </div>
          <div className="shareIcon-div">
            <img
              src={`${shareIcon}`}
              className="iconsforPost"
              onClick={handleShare}
              alt=""
            />
            <p style={{ marginLeft: "6px", marginTop: 0 }}>Share</p>
          </div>
        </div>
        {show === true ? (
          <div style={{ padding: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to={`/Users/${userId}`} className="Avatar">
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
              <button className="addCommentbtn" onClick={handleComment}>
                Post
              </button>
            </div>
            {Comments.map((item) => (
              <div style={{ alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Link to={`/Users/${item?._id}`} className="Avatar">
                    <Avatar
                      backgroundColor="#009dff"
                      px="10px"
                      py="16px"
                      borderRadius="50%"
                      color="white"
                      fontSize="14px"
                    >
                      {item?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Link>
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
