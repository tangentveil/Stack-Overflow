import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import User from "./User";
import "./Users.css";
import usersReducer from "../reducers/users";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  // console.log(users);

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
            `https://stackoverflow-server-9k5a.onrender.com/user/getAllUsers`
        );
        setUsers(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, []);

  const [search, setSearch] = useState("");

  // console.log(search);
  // console.log(users.name)

  return (
    <>
      <div>
        <form>
          <input
            type="text"
            value={search}
            placeholder="Search Users..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="userList-container">
        {search !== ""
          ? users
              .filter(
                (user) =>
                  user.name.toLocaleLowerCase().includes(search)
              )
              .map((user) => {
                return <User user={user} key={user?._id} />;
              })
          : users.map((user) => {
              return <User user={user} key={user?._id} />;
            })}
      </div>
    </>
  );
};

export default UsersList;
