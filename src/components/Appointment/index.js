import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';

export default function Appointment(props) {
  const renderSlot = () => {
    if (props.interview) {
      return (
        <Show />
      )
    } else {
      return (
        <Empty />
      )
    }
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {renderSlot()}
    </article>
  );
};