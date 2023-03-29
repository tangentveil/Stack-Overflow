const postsReducer = (states = [], action) => {
  switch (action.type) {
    case "ALL_POSTS":
      //     console.log(action.payload)
      return action.payload;
    //   action.payload.map((item) => {
    //     console.log(item)
    //     return item;
    //   });

    default:
      return states;
  }
};

export default postsReducer;
