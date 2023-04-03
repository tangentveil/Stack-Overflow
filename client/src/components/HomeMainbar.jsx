import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./HomeMainbar.css";
import { useSelector } from "react-redux";

import Questions from "./Questions";

const HomeMainbar = () => {
  // var questionList = [
  //   {
  //     _id: 1,
  //     votes: 10,
  //     upVotes: 2,
  //     downVotes: 3,
  //     noOfAnswers: 20,
  //     questionTitle: "What is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript", "R", "Python"],
  //     userPosted: "nano",
  //     askedOn: "jan 1",
  //     userId: 1,
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "Ani",
  //         answeredOn: "jan 2",
  //         userId: 1,
  //       },
  //     ],
  //   },
  //   {
  //     _id: "2",
  //     votes: 13,
  //     upVotes: 5,
  //     downVotes: 3,
  //     noOfAnswers: 10,
  //     questionTitle: "hooks?",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript", "React", "Python"],
  //     userPosted: "DeusEx",
  //     askedOn: "jan 23",
  //     userId: "2",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "Ani",
  //         answeredOn: "jan 25",
  //         userId: "3",
  //       },
  //     ],
  //   },
  // ];

  const user = useSelector((state) => state.currentUserReducer);
  // console.log(user.result._id)
  const questionList = useSelector((state) => state.AskQuestionReducer);
  // console.log(questionList)

  const location = useLocation();
  const navigate = useNavigate();

  const checkAuth = () => {
    if(user === null){
      alert("login or singin to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  }

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionList.data.length} questions</p>
            <>
              {questionList.data.map((question) => {
                return <Questions question={question} key={question._id} />;
              })}
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
