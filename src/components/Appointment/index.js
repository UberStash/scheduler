import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING ="SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"

export default function Appointment(props) {
  // console.log(props)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
    
    function deleteInterview(event) {
      
      transition(DELETING)
      props.cancelInterview(props.id).then(() => transition(EMPTY))
      // transition(EMPTY)
    }

    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING)
      props.bookInterview(props.id, interview).then(() => transition(SHOW))
    }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onDelete={ () => transition(CONFIRM)}
          onEdit={ () => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

{mode === EDIT && <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          onCancel={back}
          onSave={save}
        />}


{mode === SAVING && <Status message={"Saving!"}/>}
{mode === DELETING && <Status message={"Deleting!"}/>}
{mode === CONFIRM && ( <Confirm message="Are you sure you would like to delete?" onConfirm={deleteInterview} onCancel={back} /> )}

    </article>
  );
}
