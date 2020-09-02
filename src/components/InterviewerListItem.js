import React from 'react'

import "./InterviewerListItem.scss"

export default function InterviewerListItem(props) {

  const { name, avatar, selected, setInterviewer } = props;
  const selectedClass = [selected && "interviewers__item--selected", selected && "interviewers__item--selected-image"];

  return (
    <li
      className={`interviewers__item ${selectedClass[0]}`}
      alt={name}
      selected={selected}
      onClick={setInterviewer}
    >
      <img
        className={`interviewers__item-image ${selectedClass[1]}`}
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>

  )

} 