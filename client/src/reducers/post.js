const postsReducer = (states = [], action) => {
  switch (action.type) {
    case "ALL_POSTS":
      return action.payload;
    default:
      return states;
  }
};

export default postsReducer;
