import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const showDays = props.days.map((day) => (
    <DayListItem
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
      key={props.day + day.name}
    />
  ));

  return <ul>{showDays}</ul>;
}
