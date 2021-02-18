import React, { useState, useEffect } from "react";
import "components/Application.scss";
// import Button from "components/Button";
// import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import Appointment from 'components/Appointment';
import axios from 'axios';
import getAppointmentsForDay from 'helpers/selectors';




export default function Application(props) {
  
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const formatedAppointments = dailyAppointments.map((item) => {
    return (
      <Appointment
        key={item.id}
        {...item}
      />
    );
  });

  

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };

  useEffect(() => {
    const daysURL = 'http://localhost:8001/api/days';
    const appointmentsURL = 'http://localhost:8001/api/appointments';
    const interviewersURL = 'http://localhost:8001/api/interviewers';

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ])
      .then((all) => {
        const [days, appointments, interviewers] = all;
        setState((prev) => {
          return {...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data };
        });
      })
      .catch((err) => {
        console.log(err);
      });

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
