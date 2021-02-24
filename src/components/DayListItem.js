import React from "react";
import "components/DayListItem.scss";

/* props
name:String the name of the day
spots:Number the number of spots remaining
selected:Boolean true or false declaring that this day is selected
setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
*/

const classNames = require('classnames');


export default function DayListItem(props) {

  const formatSpots = function() {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return `${props.spots} spot remaining`;
    } else if (props.spots === 2) {
      return `${props.spots} spots remaining`;
    }else {
      return props.spots;

    }
  };

  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': (props.spots === 0)
  });

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}