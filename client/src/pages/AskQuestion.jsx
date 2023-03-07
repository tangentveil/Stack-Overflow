import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AskQuestion.css";
import {askQuestion} from '../actions/AskQuestion.js';

import { useDispatch, useSelector } from "react-redux";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const dispatch = useDispatch();
  
  var user = useSelector((state) => state.currentUserReducer);
  
  const navigate = useNavigate();


  const redirect = () => {
    alert("login or singin to ask a question");
    navigate("/Auth");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(typeof(questionTitle))
    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody,
          questionTags,
          userPosted: user.result.name,
          userId: user?.result?._id
        },
        navigate
      )
    );
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  return (
    <>
      {user === null ? (
        redirect()
      ) : (
        <div className="ask-question">
          <div className="ask-ques-container">
            <h1>Ask a public Question</h1>
            <form onSubmit={handleSubmit}>
              <div className="ask-form-container">
                <label htmlFor="ask-ques-title">
                  <h4>Title</h4>
                  <p>
                    Be spacific and imagine you're asking a question to another
                    person
                  </p>
                  <input
                    type="text"
                    id="ask-question-title"
                    placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                    onChange={(e) => setQuestionTitle(e.target.value)}
                  />
                </label>

                <label htmlFor="ask-ques-body">
                  <h4>Body</h4>
                  <p>
                    Include all the information someone would need to answer
                    your question
                  </p>
                  <textarea
                    id="ask-question-body"
                    onChange={(e) => setQuestionBody(e.target.value)}
                    onKeyPress={handleEnter}
                  ></textarea>
                </label>

                <label htmlFor="ask-ques-tags">
                  <h4>Tags</h4>
                  <p>
                    Add up to 5 tags to describe what your question is about
                  </p>
                  <input
                    type="text"
                    id="ask-question-tags"
                    placeholder="e.g. (xml tyescript wordpress)"
                    onChange={(e) => setQuestionTags(e.target.value.split(" "))}
                  />
                </label>
              </div>

              <input
                type="submit"
                value="Review your question"
                className="review-btn"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AskQuestion;
