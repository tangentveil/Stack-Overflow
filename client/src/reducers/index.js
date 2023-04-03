import { combineReducers } from "redux";
import authReducer from "./auth.js";
import currentUserReducer from "./currentUser.js";
import AskQuestionReducer from "./AskQuestion.js";
import usersReducer from "./users.js";
import postsReducer from "./post.js";
import userpostsReducer from './userPosts.js'

export default combineReducers({
  authReducer,
  currentUserReducer,
  AskQuestionReducer,
  usersReducer,
  postsReducer,
  userpostsReducer,
});
