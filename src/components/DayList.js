import React from "react";
import DayListItem from "components/DayListItem";

/* props
days:Array a list of day objects (each object includes an id, name, and spots)
day:String the currently selected day
setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
*/

export default function DayList(props) {

  const mappedDays = props.days.map((item) => {
    return (<DayListItem
    key={item.id}
    name={item.name} 
    spots={item.spots} 
    selected={item.name === props.day}
    setDay={props.setDay}  />);
  });

  return (
    <ul>{ mappedDays }</ul>
  );
}