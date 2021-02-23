import { useState } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const calculateSpots = function(appointments, state) {
    // stale state (prev) is OK, because this is only used to get the appointment IDs associated with a specific day. That does NOT change.
    let days = [...state.days];

    for (const day of state.days) {
      // number of spots for this specific day
      let spots = 5;

      // list of appointments associated with this day
      const appointmentIDs = day.appointments;

      for (const appointmentID of appointmentIDs) {
        // console.log(appointments[appointmentID].interview);
        if (appointments[appointmentID].interview) {
          spots--;
        }
      }

      console.log(`day (id: ${day.id}) has ${spots} spots.`);
      // -1 because array starts at 0
      days[day.id - 1].spots = spots;
    }

    return days;

  };

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
        // console.log(resp);        
        // console.log('stale state:', state);

        setState((prev) => {
          // console.log('current state', prev);
          // console.log('updated state', {...prev, appointments});

          const days = calculateSpots(appointments, prev);
          return {
            ...prev,
            appointments,
            days
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
          const days = calculateSpots(appointments, prev);
          return {
            ...prev,
            appointments,
            days
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