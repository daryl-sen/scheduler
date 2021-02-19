export const getAppointmentsForDay = function(state, day) {
  let output = [];
  const selectedDay = state.days.filter((dayObj) => dayObj.name === day);
  if (selectedDay.length === 0) {
    return [];
  }
  const selectedDayAppointmentIDs = selectedDay[0].appointments;

  for (const id of selectedDayAppointmentIDs) {
    let appointmentObj = {};
    output.push(state.appointments[id]);
  }
  return output;
};

export const getInterview = function(state, interviewDetails) {
  if (!interviewDetails) {
    return null;
  }
  const targetInterviewer = state.interviewers[interviewDetails.interviewer]
  // console.log(targetInterviewer)
  return {
    student: interviewDetails.student,
    interviewer: {
      id: interviewDetails.interviewer,
      name: targetInterviewer.name,
      avatar: targetInterviewer.name
    }
  }
};