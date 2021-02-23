import React, { useEffect, useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  console.log('Form props:', props);

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewerID || null);

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
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => {setName(event.target.value)}}
            value={name || ""}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} setInterviewer={setInterviewer} interviewer={interviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={props.onCancel} danger>Cancel</Button>
          <Button onClick={() => { props.onSave(name, interviewer) }} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};