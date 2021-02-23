import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  console.log('interviewerlist props:', props);

  // InterviewerList.PropTypes = {
  //   interviewers: PropTypes.array.isRequired
  // };

  const interviewers = props.interviewers.map((interviewer) => {
    console.log(interviewer);
    console.log((interviewer.id === props.interviewer));

    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={(interviewer.id === props.interviewer)}
        // interviewer={interviewer.name}
        setInterviewer={(event) => props.setInterviewer(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        { interviewers }
      </ul>
    </section>
  );
};