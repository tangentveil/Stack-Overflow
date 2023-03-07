import { combineReducers } from "redux";
import authReducer from "./auth.js";
import currentUserReducer from "./currentUser.js";
import AskQuestionReducer from "./AskQuestion.js";
import usersReducer from "./users.js";

export default combineReducers({
  authReducer,
  currentUserReducer,
  AskQuestionReducer,
  usersReducer
});
