export function getAppointmentsForDay(state, day) {
  const arr = [];
  
    state.days.forEach(eachDay => {
      if (eachDay.name === day) {
        eachDay.appointments.forEach(appointmentId => {
          arr.push(state.appointments[appointmentId]);
        });
      }
    });
  
  
  console.log(state.days)
return arr
}