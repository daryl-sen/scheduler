import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from 'components/Appointment';
import {getAppointmentsForDay, getInterviewersForDay} from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';  

export default function Application(props) {

  const {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersForDay = getInterviewersForDay(state, state.day);

  const formatedAppointments = dailyAppointments.map((item) => {

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
        interviewer={interviewerName}
        interviewers={interviewersForDay}
        cancelInterview={cancelInterview}
        {...item}
      />
    );
  });

  formatedAppointments.push((
    <Appointment key="last" time="5pm" /> 
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
};
