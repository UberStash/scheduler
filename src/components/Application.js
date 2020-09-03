import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from"components/DayList";
import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

// trying to import the helper function to sort the array last question of day :( cant seem to import!!!!!!




export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  
  const appointments = getAppointmentsForDay(state, state.day);

  useEffect(() => {
    console.log('fetch axios');

  Promise.all([
    Promise.resolve(
      axios({ url: `http://localhost:8001/api/days`, method: 'GET'})
  ),


  Promise.resolve(
    axios({ url: `http://localhost:8001/api/appointments`, method: 'GET'})  
  )

  ]).then((all) => {
    setState(prev => ({ day: state.day, days: all[0].data, appointments: all[1].data}));
  });

}, [])



  
  const appointmentList = appointments.map(app => {
    return <Appointment key={app.id} {...app} />
  })

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
<DayList key={state.days.id} days={state.days} day={state.day} setDay={setDay} />
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
