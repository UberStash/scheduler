import React from "react";
import "components/InterviewerListItem.scss";
import classnames from 'classnames';


export default function interviewerListItem(props) {


  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    
  });

// const setInterviewer = function (props) {
//   props.setInterviewer = !props.set
// }


return (
  <li className={interviewerClass} onClick={props.setInterviewer()}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
)


}