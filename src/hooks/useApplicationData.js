import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {
  //////////////////////////////////START STATE
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {},
    interviewers: [],
  });

  const setDay = (day) => setState({ ...state, day });
  

  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axios({ url: `http://localhost:8001/api/days`, method: "GET" })
      ),
      Promise.resolve(
        axios({ url: `http://localhost:8001/api/appointments`, method: "GET" })
      ),
      Promise.resolve(
        axios({ url: `http://localhost:8001/api/interviewers`, method: "GET" })
      ),
    ]).then((all) => {
      setState((prev) => ({
        day: state.day,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, [state.day]);

  ////////////////////////////////////////////// END STATE

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
console.log('INTERVIEW', appointment)
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    
    setState({
      ...state,
      appointments, 
      days: spotsRemaining('a')
    });

    
    
    console.log(appointments)
    

    return Promise.resolve(
      axios.put(` http://localhost:8001/api/appointments/${id}`, appointment)
    ).then (
     
    )
    
  }

  const spotsRemaining = function (action) {
  let spots = 0
    if (action === 'a') spots = -1;
    if (action === 'd') spots = 1;
  
    
    for (let day in state.days) {
      if ((state.days[day].name === state.day)) {
        for (let id of state.days[day].appointments) {
          console.log(id)
          if (state.appointments[id].interview === null) {
            spots++
            console.log(spots)
          }
        }
      }
    }
    return state.days.map((day) => { return day.name !== state.day ? day : { ...day, spots }})
  }


  function cancelInterview(id) {
  
    return Promise.resolve(
      axios
        .delete(` http://localhost:8001/api/appointments/${id}`)
        .then((response) => {
          const appointment = {
            ...state.appointments[id],
            interview: null,
            test: true
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment,
          };
          

          setState({
            ...state,
            appointments,
            days: spotsRemaining('d')
          });

          

console.log(state)
        })
    );
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
