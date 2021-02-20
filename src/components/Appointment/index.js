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

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

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
      />}
    </article>
  );
};