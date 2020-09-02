import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";




export default function Appointment(props) {
  return (
  
  <article className="appointment">
    <Header time={props.time} />
    {props.interview? <Show 
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          /> : <Empty/>}
    
   
     
  </article>
  
  );
}
