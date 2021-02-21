import React, { useState, useEffect } from "react";
import "components/Application.scss";
// import Button from "components/Button";
// import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import Appointment from 'components/Appointment';
import axios from 'axios';
import {getAppointmentsForDay, getInterviewersForDay} from 'helpers/selectors';




export default function Application(props) {
  console.log('refreshed');

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
        // console.log(interviewers);
        setState((prev) => {
            return {...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data };
        });
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
  
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  // console.log('fresh state:', state);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersForDay = getInterviewersForDay(state, state.day);

  const bookInterview = function(id, interview) {
    console.log(`Received Params: {id: ${id}}, interview: ${interview}`);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((resp) => {
        console.log(resp);

        console.log('updated list on page');
        
        // console.log('stale state:', state);

        // this will not run until later
        setState((prev) => {
          console.log('current state', prev);
          console.log('updated state', {...prev, appointments});
          return {
            ...prev,
            appointments
          }
        });
      }) 
  }

  const cancel = function() {
    console.log('cancel from application.js');
  };

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };

  const formatedAppointments = dailyAppointments.map((item) => {
    // console.log('item: ', item); // gives an obj with id, time, interview

    let interviewerName;

    if (item.interview !== null) {
      const interviewerID = item.interview.interviewer;
      interviewerName = state.interviewers[interviewerID].name;
    } else {
      interviewerName = null;
    }



    return (
      <Appointment
        key={item.id}
        id={item.id}
        bookInterview={bookInterview}
        cancel={cancel}
        interviewer={interviewerName}
        interviewers={interviewersForDay}
        {...item}
      />
    );
  });

  formatedAppointments.push((
    <Appointment key="last" time="5pm" bookInterview={bookInterview} cancel={cancel} /> 
  ));

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
      </section>
    </main>
  );
}
