import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList"

export default function Confirm(props) {
  // console.log(props)
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] =useState(props.name || '')
  
  function reset() {
    setName("");
    setInterviewer(null);
  }
  
  
  function cancel() {
    reset();
    props.onCancel();
  }

function validate() {
  props.onSave(name, interviewer)
}
  
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={name}
        value={name}
        onChange={event => {setName(event.target.value)}}
        submitted={"false"}
        placeholder={ props.student || "Enter Student Name"}
        
      />
    </form>
    <InterviewerList 
    interviewers={props.interviewers} 
    value={interviewer} 
    onChange={setInterviewer} />

  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={validate}
      
      >Save</Button>
    </section>
  </section>
</main>
  );
}
