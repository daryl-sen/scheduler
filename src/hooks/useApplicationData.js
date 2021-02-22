import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
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

    // this will not run right away, return the promise so the `save` function can do something AFTER this query runs
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((resp) => {
        console.log(resp);        
        // console.log('stale state:', state);

        setState((prev) => {
          // console.log('current state', prev);
          // console.log('updated state', {...prev, appointments});
          return {
            ...prev,
            appointments
          }
        });
      }) 
  };

  const cancelInterview = function(interviewID) {
    console.log('cancelInterview Ran');

    const appointment = {
      ...state.appointments[interviewID],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [interviewID]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${interviewID}`)
      .then(() => {
        console.log('delete request sent');
        setState((prev) => {
          return {
            ...prev,
            appointments
          }
        });
      });

  };

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  return {
    state,
    setDay,
    setState,
    bookInterview,
    cancelInterview
  };
};