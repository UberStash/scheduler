import { useState, useEffect } from "react";

import axios from "axios";
import { spotsRemaining } from "helpers/selectors";

export default function useApplicationData() {
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
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, [state.day]);

  // Creates interview object then makes put request, updates state to reflect changes
  function bookInterview(id, interview, edit) {
    let action = "delete";
    if (edit) {
      action = "edit";
    }

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then( () =>
        setState({
          ...state,
          appointments,
          
        })
      ).then(() =>
      setState(spotsRemaining)

      )
      
  }
 
  // Deletes interview from db and from state then refreshes with changes
  function cancelInterview(id) {
    return axios
        .delete(`/api/appointments/${id}`)
        .then((response) => {
          const appointment = {
            ...state.appointments[id],
            interview: null,
            test: true,
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment,
          };

          setState({
            ...state,
            appointments,
            
          });
        }
        ).then(() =>
      setState(spotsRemaining)

      )
    
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
