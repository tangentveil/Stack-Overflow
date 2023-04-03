import * as api from "../api";

export const userPosts = (id) => async (dispatch) => {
  try {
    const { data } = await api.UserPosts(id);
    // console.log(data)
    dispatch({ type: "USER_POSTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
