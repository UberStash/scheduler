import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from"components/DayList";
import "components/Appointment"
import Appointment from "components/Appointment";



const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Jane",
      interviewer: {
        id: 2,
        name: "Prof Quack",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Bacchus",
      interviewer: {
        id: 3,
        name: "Jet Li",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 1,
    time: "4pm",
  }
];

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];




export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    console.log('fetch axios');
  
  axios({
    url: `http://localhost:8001/api/days`,
    method: 'GET'
  })
  .then(result => {
    setDays(result.data)
  })
  
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
