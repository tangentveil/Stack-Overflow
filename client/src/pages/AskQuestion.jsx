import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AskQuestion.css";
import { askQuestion, updateSubscription } from "../actions/AskQuestion.js";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../actions/currentUser";
import { useParams } from "react-router";

const AskQuestion = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.currentUserReducer);
  const userId = user?.result?._id;
  var nOfQuestionPerDay = user?.result?.nOfQuestionPerDay;

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log(userId);
  console.log(id, nOfQuestionPerDay);

  // useEffect(() => {
  //   dispatch(setCurrentUser());
  // }, [dispatch]);

  const redirect = () => {
    alert("login or singin to ask a question");
    // navigate("/Auth");
  };

  // useEffect(() => {
  //   if(!user) navigate("/Auth");
  // }, []);

  const handleSubmit = (e, nOfQuestion) => {
    e.preventDefault();
    // console.log(typeof(questionTitle))
    if (nOfQuestion > 0) {
      dispatch(
        askQuestion({
          questionTitle,
          questionBody,
          questionTags,
          userPosted: user.result.name,
          userId: user?.result?._id,
        })
      );

      dispatch(
        updateSubscription(id, { nOfQuestionPerDay: nOfQuestion - 1 }, navigate)
      );
    } else {
      alert("Come Back Tomorrow");
    }
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
            <form onSubmit={(e) => {handleSubmit(e, nOfQuestionPerDay)}}>
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
