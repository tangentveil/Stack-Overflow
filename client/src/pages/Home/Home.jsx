import React from "react";
import '../../App.css'

import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import HomeMainbar from "../../components/HomeMainbar";

const Home = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar></LeftSidebar>
      <div className="home-container-2">
        <HomeMainbar></HomeMainbar>
        <RightSidebar></RightSidebar>
      </div>
    </div>
  );
};

export default Home;
