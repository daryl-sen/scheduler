import React from 'react';
import "components/InterviewerListItem.scss";
const classNames = require('classnames');

export default function InterviewerListItem(props) {

  const classes = classNames('interviewers__item', {
    'interviewers--selected': props.selected,
  });

  return (
    <li className={classes}>
      <img
        key={props.id}
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.name}
    </li>
  );
}