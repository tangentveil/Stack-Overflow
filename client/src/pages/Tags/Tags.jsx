import React from "react";
import LeftSidebar from "../../components/LeftSidebar";
import TagList from "./TagList";
import './Tags.css'

const tags = () => {
  const tagList = [
    {
      id: 1,
      tagName: "javascript",
      tagdesc: "For question regarding in ECMAScript",
    },
    {
      id: 2,
      tagName: "java",
      tagdesc: "For question regarding in ECMAScript",
    },

    {
      id: 3,
      tagName: "C++",
      tagdesc: "For question regarding in ECMAScript",
    },

    {
      id: 4,
      tagName: "React",
      tagdesc: "For question regarding in ECMAScript",
    },

    {
      id: 5,
      tagName: "Raect Native",
      tagdesc: "For question regarding in ECMAScript",
    },
  ];

  return (
    <div className="home-container-1">
      <LeftSidebar></LeftSidebar>
      <div className="home-container-2">
        <h1 className="tags-h1">Tags</h1>
        <p className="tags-p">
          A tag is a keyword or label that categorizes your question with other,
          similar questions.
        </p>
        <p className="tags-p">
          Using the right tags makes it easier for others to find and answer
          your question.
        </p>
        <div className="tags-list-container">
          {tagList.map((tag) => {
            return <TagList tag={tag} key={tag.id}></TagList>;
          })}
        </div>
      </div>
    </div>
  );
};

export default tags;
