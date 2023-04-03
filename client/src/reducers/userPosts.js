const userpostsReducer = (states = [], action) => {
  switch (action.type) {
    case "USER_POSTS":
    //   console.log(action.payload);
      return action.payload;
    default:
      return states;
  }
};

export default userpostsReducer;
