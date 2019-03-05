import React, { Component } from "react";
import DateButton from "../styled/DateButton";
import InfiniteCalendar from "react-infinite-calendar";
import DatePickerDiv from "../styled/DatePickerDiv";

import "react-infinite-calendar/styles.css";

class JournalDate extends Component {
  state = {
    showCalendar: false
  };

  showCalendar = () => {
    // document.addEventListener("click", this.closeCalendar);
    this.setState({ showCalendar: true });
  };

  closeCalendar = date => {
    this.props.handleDateChange(date);

    document.removeEventListener("click", this.closeCalendar);
    this.setState({ showCalendar: false });
  };

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
    const dayNumber = today.getDate();
    const dayName = days[day];
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();
    return (
      <div>
        <div>
          <DateButton onClick={this.showCalendar}>
            <h2>{`${dayNumber} ${dayName}`}</h2>
            <h3>{`${monthName} ${year}`}</h3>
          </DateButton>
        </div>

        <DatePickerDiv>
          {this.state.showCalendar ? (
            <InfiniteCalendar
              width={350}
              height={250}
              selected={today}
              onSelect={this.closeCalendar}
              displayOptions={{
                showHeader: false
              }}
              theme={{
                accentColor: "#448AFF",
                floatingNav: {
                  background: "#4B77BE",
                  chevron: "#00000000",
                  color: "#FFF"
                },
                headerColor: "#22A7F0",
                selectionColor: "#22A7F0",
                textColor: {
                  active: "#FFF",
                  default: "#333"
                },
                todayColor: "#FFA726",
                weekdayColor: "#22A7F0"
              }}
            />
          ) : null}
        </DatePickerDiv>
      </div>
    );
  }
}

export default JournalDate;
