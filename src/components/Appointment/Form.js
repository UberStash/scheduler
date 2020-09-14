import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");
  // resets interview
  function reset() {
    setName("");
    setInterviewer(null);
  }
  // cancels operation either new form edit or delete
  function cancel() {
    reset();
    props.onCancel();
  }
  // validates that the name must be enetered
  function validate() {
    if (!name) {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("You must select an interviewer");
      return;
    }
    if (props.edit) {
      setError("");
      props.onSave(name, interviewer, "edit");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  function checkName () {
    if (!name) {
      console.log("win")
      return props.student
    }
  }
  console.log(props);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            value={checkName()}
            onChange={(event) => setName(event.target.value)}
            placeholder={"Enter Student Name"}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer || props.interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
