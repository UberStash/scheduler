// Returns each booked appt for each day
export function getAppointmentsForDay(state, day) {
  const arr = [];

  state.days.forEach((eachDay) => {
    if (eachDay.name === day) {
      eachDay.appointments.forEach((appointmentId) => {
        arr.push(state.appointments[appointmentId]);
      });
    }
  });

  return arr;
}
// Returns either null or correct interview for time slot
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
}

// lists all interviewers for single day
export function getInterviewersByDay(state, day) {
  let result = [];
  let date = state.days.filter((value) => value.name === day);
  if (date.length === 0) return result;
  result = date[0].interviewers.map((person) => state.interviewers[person]);
  return result;
}
