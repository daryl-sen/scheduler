import React, { useEffect, useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  console.log('Form props:', props);

  const reset = function() {
    setName("");
    setInterviewer(null);
  };

  useEffect(() => {
    if (props.interview) {
      setName(props.interview.student)
    }
  }, []);
  
  // console.log('form props:', props);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => {setName(event.target.value)}}
            value={name || ""}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={props.onCancel} danger>Cancel</Button>
          <Button onClick={() => { props.onSave(name, interviewer, props.interviewID) }} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};