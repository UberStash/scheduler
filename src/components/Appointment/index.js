import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  // controls state of the ineterview item
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
// deletes interview with promise then either executes or provides error 
  function deleteInterview(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }
// saves form into DB and updates state
  function save(name, interviewer, edit) {
    
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    transition(SAVING);

    if (edit) {
      props
      .bookInterview(props.id, interview, true)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
      return;  
    }

    props
      .bookInterview(props.id, interview, false)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
          edit={true}
        />
      )}

      {mode === SAVING && <Status message={"Saving!"} />}
      {mode === DELETING && <Status message={"Deleting!"} />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={deleteInterview}
          onCancel={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Error Deleting Your Interview!"} onClose={back} />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Error Saving Your Interview!"} onClose={back} />
      )}
    </article>
  );
}
