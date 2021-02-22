import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import {useVisualMode} from 'hooks/useVisualMode';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';


export default function Appointment(props) {
  // MODES
  const [ EMPTY, SHOW, CREATE, SAVING, CONFIRM, DELETING, EDIT, ERROR_SAVE, ERROR_DELETE ] = [ 'EMPTY', 'SHOW', 'CREATE', 'SAVING', 'CONFIRM', 'DELETING', 'EDIT', 'ERROR_SAVE', 'ERROR_DELETE' ];


  // console.log('appointment props:', props);

  const { mode, transition, back } = useVisualMode(() =>
    {if (props.interview) {
      return SHOW;
    } else {
      return EMPTY;
    }}
  );

  const save = function(studentName, interviewer, interviewID) {
    const interview = {
      student: studentName,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(interviewID, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE);
      });
  }

  const onConfirmDelete = function(interviewID) {
    transition(DELETING);
    props.cancelInterview(interviewID)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE);
      });
  }

  const onCancelDelete = function() {
    back();
  }

  const edit = function() {
    console.log('ran edit function');
    transition(EDIT);
  }

  const cancelEdit = function() {
    
  }
  

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={edit}
        />
      }
      {mode === CREATE &&
        <Form
          interviewers = {props.interviewers}
          interview={props.interview}
          interviewID={props.id}
          interviewer={props.interviewer}
          onCancel={props.cancel}
          onSave={save}
        />
      }
      {mode === SAVING &&
        <Status message={'SAVING....'}/>
      }
      {mode === CONFIRM &&
        <Confirm
          message={'Are you sure you want to delete this appointment?'}
          onCancel={() => {onCancelDelete()}}
          onConfirm={() => {onConfirmDelete(props.id)}}
        />
      }
      {mode === DELETING &&
        <Status messsage={'DELETING....'}/>
      }
      {mode === EDIT &&
        <Form
          interviewers = {props.interviewers}
          interview={props.interview}
          interviewID={props.id}
          // interviewer={props.interviewer}
          onCancel={props.cancel}
          onSave={save}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message={'An error occurred while deleting your appointment'}
          onClose={back}
        />
      }
      {mode === ERROR_SAVE &&
        <Error
          message={'An error occured while saving your appointment'}
          onClose={back}
        />
      }
      
    </article>
  );
};