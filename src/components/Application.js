import React, { useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import axios from 'axios';
import Appointment from 'components/Appointment';
import {getAppointmentsForDay, getInterviewersForDay} from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';  




export default function Application(props) {

  const {
    state,
    setState, // why wasn't this included in compass??? It's kinda important
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  console.log('rerendered');

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
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.data);
      });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersForDay = getInterviewersForDay(state, state.day);

  // useless function??
  const cancel = function() {
    console.log('cancel from application.js');
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
        cancelInterview={cancelInterview}
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
