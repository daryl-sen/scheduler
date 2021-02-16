import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const mappedDays = props.days.map((item) => {
    return <DayListItem 
    name={item.name} 
    spots={item.spots} 
    selected={item.name === props.day}
    setDay={props.setDay}  />;
  });

  return (
    <ul>{ mappedDays }</ul>
  );
}