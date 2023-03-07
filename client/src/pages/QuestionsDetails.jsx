import React from "react";
import { useParams } from "react-router";
import "./Questions.css";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import DisplayAnswers from "./DisplayAnswers";
import up from "../assets/caret-up-solid.svg";
import down from "../assets/caret-down-solid.svg";
import moment from "moment";
import copy from "copy-to-clipboard";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  postAnswer,
  deleteQuestion,
  voteQuestion,
} from "../actions/AskQuestion.js";

const QuestionsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questionList = useSelector((state) => state.AskQuestionReducer);
  // var questionList = [
  //   {
  //     _id: "1",
  //     votes: 10,
  //     upVotes: 2,
  //     downVotes: 3,
  //     noOfAnswers: 20,
  //     questionTitle: "What is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript", "R", "Python"],
  //     userPosted: "nano",
  //     askedOn: "jan 1",
  //     userId: "1",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "Ani",
  //         answeredOn: "jan 2",
  //         userId: "1",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "2",
  //     votes: 13,
  //     upVotes: 3,
  //     downVotes: 5,
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

  const [answer, setAnswer] = useState("");
  const user = useSelector((state) => state.currentUserReducer);

  const handlePostAnswer = (e, answerLength) => {
    e.preventDefault();

    if (user === null) {
      alert("Login or signup to answer a question");
      navigate("/Auth");
    } else {
      if (answer === "") {
        alert("Enter an answer before submitting");
      } else {
        dispatch(
          postAnswer(
            {
              id,
              noOfAnswers: answerLength + 1,
              answerBody: answer,
              userAnswered: user.result.name,
              userId: user.result._id,
            },
            navigate
          )
        );
      }
    }
  };

  const location = useLocation();
  const url = `http://localhost:3000`;

  const handleShare = () => {
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };

  // integrated with backend
  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpVote = () => {
    dispatch(voteQuestion(id, "upVote", user.result._id));
  };

  const handleDownVote = () => {
    dispatch(voteQuestion(id, "downVote", user.result._id));
  };

  return (
    <div className="question-details-page">
      {questionList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionList.data
            .filter((question) => question._id === id)
            .map((question) => {
              return (
                <div key={question._id}>
                  <section className="question-details-container">
                    <h1>{question.questionTitle}</h1>
                    <div className="question-details-container-2">
                      <div className="question-votes">
                        <img
                          src={up}
                          className="votes-icon"
                          alt=""
                          onClick={handleUpVote}
                        />
                        <p>{question.upVote.length - question.downVote.length}</p>
                        <img
                          src={down}
                          className="votes-icon"
                          alt=""
                          onClick={handleDownVote}
                        />
                      </div>
                      <div style={{ width: "100%" }}>
                        <p className="question-body">{question.questionBody}</p>
                        <div className="question-details-tags">
                          {question.questionTags.map((tag) => {
                            return <p key={tag}>{tag}</p>;
                          })}
                        </div>
                        <div className="question-actions-user">
                          <div>
                            <button
                              type="button"
                              className="edit-question-btn"
                              onClick={handleShare}
                            >
                              Share
                            </button>
                            {user?.result?._id === question?.userId && (
                              <button
                                type="button"
                                className="edit-question-btn"
                                onClick={handleDelete}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                          <div>
                            <p>asked {moment(question.askedOn).fromNow()}</p>
                            <Link
                              to={`/Users/${question.userId}`}
                              className="user-link"
                              style={{ color: "#0086d8" }}
                            >
                              <Avatar
                                backgroundColor="orange"
                                px="8px"
                                py="5px"
                              >
                                {question.userPosted.charAt(0).toUpperCase()}
                              </Avatar>
                              <div>{question.userPosted}</div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {question.noOfAnswers !== 0 && (
                    <section>
                      <h3>{question.noOfAnswers} Answer</h3>
                      <DisplayAnswers
                        key={question._id}
                        question={question}
                        handleShare={handleShare}
                      ></DisplayAnswers>
                    </section>
                  )}

                  <section className="post-ans-container">
                    <h3>Your Answer</h3>
                    <form
                      onSubmit={(e) => {
                        handlePostAnswer(e, question.answer.length);
                      }}
                    >
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        onChange={(e) => setAnswer(e.target.value)}
                      ></textarea>
                      <input
                        type="submit"
                        className="post-ans-btn"
                        value="Post your Answer"
                      />
                    </form>

                    <p>
                      Browse other Question and tags
                      {question.questionTags.map((tag) => {
                        return (
                          <Link to="/Tags" key={tag} className="ans-tag">
                            {tag}
                          </Link>
                        );
                      })}
                      or
                      <Link
                        to="/AskQuestion"
                        style={{ textDecoration: "none", color: "#009dff" }}
                      >
                        {" "}
                        ask your own question.
                      </Link>
                    </p>
                  </section>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default QuestionsDetails;
