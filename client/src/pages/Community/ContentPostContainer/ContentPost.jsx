import React, { useState } from "react";
import "./ContentPost.css";
import { app } from "../../../firebase.config.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import imageIcon from "../../../assets/image-solid.svg";
import videoIcon from "../../../assets/video-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import { allPosts } from "../../../actions/posts";
import { userPosts } from "../../../actions/userPosts";

const ContentPost = () => {
  const user = useSelector((state) => state.currentUserReducer);
  const { id } = useParams();
  const dispatch = useDispatch();

  // console.log(id)

  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [title, setTitle] = useState("");

  // image and video Preview
  const [imagePre, setImagePre] = useState(null);
  const [VideoPre, setVideoPre] = useState(null);

  const [progress, setPrgress] = useState("");

  // console.log(file?.name)

  const token = user?.token;

  const handlePost = (e) => {
    e.preventDefault();
    if (file !== null) {
      const fileName = new Date().getTime() + file?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(StorageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPrgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            fetch(
              `https://stackoverflow-server-9k5a.onrender.com/community/posts/user/post`,
              {
                method: "POST",
                headers: { "Content-Type": "application/JSON", token: token },
                body: JSON.stringify({
                  title: title,
                  image: downloadURL,
                  video: "",
                }),
              }
            ).then((data) => {
              alert("Your Post was upload successfully");
              // window.location.reload(true);
              dispatch(allPosts());
              dispatch(userPosts(id));
              setImagePre(null);
              setTitle("");
              setPrgress("");
            });
          });
        }
      );
    } else if (file2 !== null) {
      const fileName = new Date().getTime() + file2?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(StorageRef, file2);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPrgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            fetch(
              `https://stackoverflow-server-9k5a.onrender.com/community/posts/user/post`,
              {
                method: "POST",
                headers: { "Content-Type": "application/JSON", token: token },
                body: JSON.stringify({
                  title: title,
                  video: downloadURL,
                  image: "",
                }),
              }
            ).then((data) => {
              alert("Your Post was upload successfully");
              dispatch(allPosts());
              dispatch(userPosts(id));
              setVideoPre(null);
              setTitle("");
              setPrgress("");
            });
          });
        }
      );
    } else {
      fetch(
        `https://stackoverflow-server-9k5a.onrender.com/community/posts/user/post`,
        {
          method: "POST",
          headers: { "Content-Type": "application/JSON", token: token },
          body: JSON.stringify({ title: title, video: "", image: "" }),
        }
      ).then((data) => {
        alert("Your Post was upload successfully");
        dispatch(allPosts());
        dispatch(userPosts(id));
        setTitle("");
      });
    }
  };

  return (
    <div className="content-post">
      <div className="ContentUploadContainer">
        <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
          <Link to={`/Users/${user?.result?._id}`} className="Avatar">
            <Avatar
              backgroundColor="#009dff"
              px="10px"
              py="16px"
              borderRadius="50%"
              color="white"
              fontSize="14px"
            >
              {user?.result?.name?.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
          <input
            type="text"
            className="contentWritingpart"
            placeholder="Write your real thought....."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ margin: "10px" }}>
          {imagePre !== null ? (
            <img src={imagePre} className="image-prev" alt="" />
          ) : VideoPre !== null ? (
            <video
              className="PostImages video-prev"
              width="500"
              height="500"
              controls
            >
              <source src={VideoPre} type="video/mp4" />
            </video>
          ) : (
            ""
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "10px",
            }}
          >
            <div>
              <label htmlFor="file">
                <img src={`${imageIcon}`} className="icons" alt="" />
                <input
                  type="file"
                  name="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => [
                    setFile(e.target.files[0]),
                    setImagePre(URL.createObjectURL(e.target.files[0])),
                  ]}
                />
              </label>
              <label htmlFor="file2">
                <img src={`${videoIcon}`} className="icons" alt="" />
                <input
                  type="file"
                  name="file2"
                  id="file2"
                  style={{ display: "none" }}
                  onChange={(e) => [
                    setFile2(e.target.files[0]),
                    setVideoPre(URL.createObjectURL(e.target.files[0])),
                  ]}
                />
              </label>
            </div>
            <button
              style={{
                height: "36px",
                marginRight: "12px",
                marginTop: "40px",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: 6,
                paddingBottom: 6,
                border: "none",
                backgroundColor: "#009dff",
                color: "white",
                borderRadius: "3px",
                cursor: "pointer",
              }}
              onClick={handlePost}
            >
              Post {Math.floor(progress)} %
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPost;
