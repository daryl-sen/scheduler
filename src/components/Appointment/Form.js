import React, { useEffect, useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  // console.log('Form props:', props);

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewerID || null);
  const [error, setError] = useState("");

  const validate = function() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    props.onSave(name, interviewer)
  }

  // console.log('Form - interviewer:', props.interviewerID);

  // not used??
  // const reset = function() {
  //   setName("");
  //   setInterviewer(null);
  // };

  // only execute once
  useEffect(() => {
    if (props.interview) {
      setName(props.interview.student)
    }
  }, []);
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => {setName(event.target.value)}}
            value={name || props.name || ""}
            data-testid="student-name-input"
            // name="name"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} setInterviewer={setInterviewer} interviewer={interviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={props.onCancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};