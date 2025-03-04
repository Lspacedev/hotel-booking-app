import { useState } from "react";
// import ArrowDropDown from "../../../assets/arrow-drop-down-48px.svg";

function Accordion({ question, answer }) {
  const [isActive, setActive] = useState(false);
  const handleClick = () => setActive(!isActive);
  return (
    <>
      <div className="Accordion">
        <div className="accordianDiv" onClick={handleClick}>
          <p className="question">{question}</p>
          {/* <img
            src={ArrowDropDown}
            className={isActive ? "arrowIconUp" : "arrowIconDown"}
          /> */}
        </div>
        {isActive && (
          <div className="answer">
            <p className="answerTitle">{answer.title}</p>

            <p className="answerDescription">{answer.description}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Accordion;
