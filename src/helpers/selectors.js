
export function getAppointmentsForDay(state, day) {
  const arr = [];
  
    state.days.forEach(eachDay => {
      if (eachDay.name === day) {
        eachDay.appointments.forEach(appointmentId => {
          arr.push(state.appointments[appointmentId]);
        });
      }
    });
  
  
 
return arr
}

export function getInterview(state, interview) {

// use find then map instead or use double foreach again

 if(interview) { 
 let obj = {
    student: interview.student,
    interviewer: {
      id: interview.interviewer,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar
    }
  
  };
    
  return obj
}

return null
}