import React, { Component } from "react";
import DateButton from "../styled/DateButton";

class JournalDate extends Component {
  render() {
    const { today } = this.props;

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const day = today.getDay();
    const dayName = days[day];
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();
    return (
      <DateButton>
        <h2>{`${day} ${dayName}`}</h2>
        <h3>{`${monthName} ${year}`}</h3>
      </DateButton>
    );
  }
}

export default JournalDate;
