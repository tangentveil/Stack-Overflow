import React, { useState, useEffect } from "react";
import "./ProfilePost.css";
import axios from "axios";
import image from "../../../assets/71840.jpg";
import shareIcon from "../../../assets/share.svg";
import commentIcon from "../../../assets/comment-solid.svg";
import LikeIcon from "../../../assets/unlike.svg";
import anotherLikeIcon from "../../../assets/like.svg";
import trash from "../../../assets/trash-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../../components/Avatar";
import { Link } from "react-router-dom";
import { allPosts } from "../../../actions/posts";
import { userPosts } from "../../../actions/userPosts";

const Post = ({ detail }) => {
  const users = useSelector((state) => state.currentUserReducer);
  const userId = users?.result?._id;
  const token = users?.token;
  const dispatch = useDispatch();

  // console.log(detail);

  const [count, setCount] = useState(detail.like.length);
  const [Comments, setComments] = useState(detail.comments);
  const [commentWriting, setCommentWriting] = useState("");
  const [show, setshow] = useState(false);

  const [user, setuser] = useState([]);

  // console.log(detail.user)

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `https://stackoverflow-server-9k5a.onrender.com/community/user/post/user/details/${detail.user}`
        );
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, []);

  const [Like, setLike] = useState(
    detail.like.includes(userId) ? anotherLikeIcon : LikeIcon
  );

  const handleLike = async () => {
    if (Like == LikeIcon) {
      await fetch(
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
      `https://stackoverflow-server-9k5a.onrender.com/community/posts/delete/post/${detail._id}`,
      {
        method: "DELETE",
      }
    ).then((data) => {
      alert("Your Post was deleted successfully");
      // window.location.reload(true);
      dispatch(userPosts(detail._id));
    });
  };

  return (
    <div className="profile-PostContainer">
      <div className="profile-SubPostContainer">
        <div className="profile-post-div">
          <div>
            <div className="profile-like-comment-share-div">
              <div style={{ display: "flex", marginLeft: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
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
                {userId === detail.user ? (
                  <>
                    <img
                      src={`${trash}`}
                      className="profile-moreicons"
                      alt=""
                      onClick={handleDelete}
                    />
                    <p style={{ marginLeft: "6px", marginTop: "1rem" }}>
                      Delete
                    </p>
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
                  onClick={handleshow}
                  alt=""
                />
                <p style={{ marginLeft: "6px", marginTop: 0 }}>
                  {Comments.length} Comments
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
              <p style={{ marginLeft: "6px", marginTop: 0 }}>Share</p>
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
                    <p
                      style={{ marginLeft: "6px", fontSize: 18, marginTop: 6 }}
                    >
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
    </div>
  );
};

export default Post;
