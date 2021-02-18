import React, { useState, useEffect } from "react";
import "components/Application.scss";
// import Button from "components/Button";
// import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import Appointment from 'components/Appointment';
import axios from 'axios';


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
      student: "Mike Rave Owen",
      interviewer: {
        id: 1,
        name: "Andy",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Manpreet",
      interviewer: {
        id: 1,
        name: "Bradley",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Appointment guy",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];


export default function Application(props) {
  
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });
  
  const formatedAppointments = appointments.map((item) => {
    return (
      <Appointment
        key={item.id}
        {...item}
      />
    );
  });

  const getAppointmentsForDay = function(state, day) {

  };

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };

  const setDays = (days) => {
    setState((prev) => ({ ...prev, days }));
  };

  useEffect(() => {
    const url = 'http://localhost:8001/api/days';
    axios.get(url)
    .then((response) => {
        setDays(response.data)
      })
  }, []);



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
        { formatedAppointments }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
