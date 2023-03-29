import * as api from "../api";

export const allPosts = () => async (dispatch) => {
  try {
    const { data } = await api.AllPosts();
    // console.log(data)
    dispatch({ type: "ALL_POSTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
