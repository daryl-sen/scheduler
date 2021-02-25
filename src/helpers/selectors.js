export const getAppointmentsForDay = function(state, day) {
  let output = [];
  const selectedDay = state.days.filter((dayObj) => dayObj.name === day);
  if (selectedDay.length === 0) {
    return [];
  }
  const selectedDayAppointmentIDs = selectedDay[0].appointments;

  for (const id of selectedDayAppointmentIDs) {
    output.push(state.appointments[id]);
  }
  return output;
};

export const getInterviewersForDay = function(state, day) {
  let output = [];
  const selectedDay = state.days.filter((dayObj) => dayObj.name === day);

  if (selectedDay.length === 0) {
    return [];
  }

  const selectedDayInterviewerIDs = selectedDay[0].interviewers;

  for (const id of selectedDayInterviewerIDs) {
    output.push(state.interviewers[id]);
  }

  return output;
}

export const getInterview = function(state, interviewDetails) {
  if (!interviewDetails) {
    return null;
  }

  const targetInterviewer = state.interviewers[interviewDetails.interviewer]
  
  return {
    student: interviewDetails.student,
    interviewer: {
      id: interviewDetails.interviewer,
      name: targetInterviewer.name,
      avatar: targetInterviewer.name
    }
  }
};