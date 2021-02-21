import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import {useVisualMode} from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form';


export default function Appointment(props) {
  // MODES
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';

  // console.log('appointment props:', props);

  const { mode, transition, back } = useVisualMode(() =>
    {if (props.interview) {
      return SHOW;
    } else {
      return EMPTY;
    }}
  );

  const save = function(studentName, interviewer, interviewID) {
    // console.log(`save function from index.js, name: ${studentName}, interviewer: ${interviewer}`);
    const interview = {
      student: studentName,
      interviewer
    };
    props.bookInterview(interviewID, interview)
      .then(() => {
        transition(SHOW);
      })
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interviewer}
        />
      )}
      {mode === CREATE &&
      <Form
        interviewers = {props.interviewers}
        onSave={props.save}
        onCancel={props.cancel}
        interviewID={props.id}
        interviewer={props.interviewer}
        interview={props.interview}
        onSave={save}
      />}
    </article>
  );
};