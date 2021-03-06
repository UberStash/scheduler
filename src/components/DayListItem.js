import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";
// verifies the amount of spots terminology
function formatSpots(props) {
  if (props.spots === 0) {
    return "no spots remaining";
  }
  if (props.spots === 1) {
    return "1 spot remaining";
  }

  return props.spots + " spots remaining";
}

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.full,
  });

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}
