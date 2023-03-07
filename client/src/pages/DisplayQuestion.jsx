import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import QuestionsDetails from "./QuestionsDetails";

const DisplayQuestion = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar></LeftSidebar>
      <div className="home-container-2">
        <QuestionsDetails></QuestionsDetails>
        <RightSidebar></RightSidebar>
      </div>
    </div>
  );
};

export default DisplayQuestion;
