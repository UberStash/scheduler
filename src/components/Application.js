import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersByDay,
} from "helpers/selectors";

// trying to import the helper function to sort the array last question of day :( cant seem to import!!!!!!

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {},
    interviewers: [],
  });

  const setDay = (day) => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const appointments = getAppointmentsForDay(state, state.day);

  // console.log(interviewers)

  useEffect(() => {
    console.log("fetch axios");

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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState({
      ...state,
      appointments,
    });

    return Promise.resolve(
      axios
        .put(` http://localhost:8001/api/appointments/${id}`, appointment)
        // .then((response) => {
        //   console.log(response);
        // })
        // .catch((error) => {
        //   console.log(error, "HEy Im and ErrOr");
        // })
    );
  }

  function cancelInterview(id) {
    console.log("Im in", id);
    

       return Promise.resolve(
          axios
            .delete(` http://localhost:8001/api/appointments/${id}`)
            .then((response) => {
              const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
       ...state.appointments,
        [id]: appointment };

        setState({
          ...state,
          appointments,
        });
            })            //   console.log(error, "HEy Im and ErrOr");
            // })
        );
      
  }

  // return Promise.resolve(
  //   axios.put(` http://localhost:8001/api/appointments/${id}`, appointment)
  // .then(response => {
  //   console.log(response);
  // })
  // )}

  const dayInterviews = getInterviewersByDay(state, state.day);

  const appointmentList = appointments.map((app) => {
    const interview = getInterview(state, app.interview);
    return (
      <Appointment
        key={app.id}
        id={app.id}
        time={app.time}
        interview={interview}
        interviewers={dayInterviews}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            key={state.days.id}
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
