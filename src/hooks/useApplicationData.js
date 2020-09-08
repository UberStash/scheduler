import { useState, useEffect } from "react";

import axios from "axios";
// import { actions } from "@storybook/addon-actions/dist/preview";

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
      
        axios.get(`/api/days`),
        axios.get(`/api/appointments`),
        axios.get(`/api/interviewers`)
      
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
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

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    

    return Promise.resolve(
      axios.put(`/api/appointments/${id}`, appointment)
    ).then (
      setState({
        ...state,
        appointments, 
        days: spotsRemaining('delete')
      })
    )
    // .catch (
      // setState({
      //   ...state,
      //   appointments, 
      //   days: spotsRemaining('netural')
      // })
    // )
  }

  const spotsRemaining = function (action) {
  let spots = 0
    if (action === 'delete') spots = -1;
    if (action === 'add') spots = 1;
    if (action === 'netural') spots = 0;
    
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
        .delete(`/api/appointments/${id}`)
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
            days: spotsRemaining('add')
          });

          

console.log(state)
        }).catch (
          setState({
            ...state,
 
            // days: spotsRemaining()
          })
        )
    );
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
