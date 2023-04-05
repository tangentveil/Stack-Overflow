import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AskQuestion.css";
import { askQuestion, updateSubscription } from "../actions/AskQuestion.js";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../actions/currentUser";
import { useParams } from "react-router";

const AskQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.currentUserReducer);
  const userId = user?.result?._id;

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  const [count, setCount] = useState(user?.result?.nOfQuestionPerDay);

  const handleSubmit = async (e) => {
    // console.log(typeof(questionTitle))
    e.preventDefault();
    if (count > 0) {
      dispatch(
        askQuestion({
          questionTitle,
          questionBody,
          questionTags,
          userPosted: user.result.name,
        })
      );

      const nOfQuestionPerDay = {
        nOfQuestionPerDay: count - 1,
      };

      await fetch(
        `https://stackoverflow-server-9k5a.onrender.com/user/updateSub/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify(nOfQuestionPerDay),
        }
      );

      setCount(count - 1);
    } else {
      alert("Come Back Tomorrow");
    }
  };

  console.log(count);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  return (
    <>
      <div className="ask-question">
        <div className="ask-ques-container">
          <h1>Ask a public Question</h1>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
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
                  Include all the information someone would need to answer your
                  question
                </p>
                <textarea
                  id="ask-question-body"
                  onChange={(e) => setQuestionBody(e.target.value)}
                  onKeyPress={handleEnter}
                ></textarea>
              </label>

              <label htmlFor="ask-ques-tags">
                <h4>Tags</h4>
                <p>Add up to 5 tags to describe what your question is about</p>
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
    </>
  );
};

export default AskQuestion;
