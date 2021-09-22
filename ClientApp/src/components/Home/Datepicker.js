import React from "react";
import moment from "moment";
import Helmet from "react-helmet";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: this.props.data.startDate ?? null,
      to: this.props.data.endDate ?? null,
    };
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    this.setState({ from });
    this.props.data.DateUpdate("startDate", from);
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    this.props.data.DateUpdate("endDate", to);
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <>
        <div className="InputFromTo">
          <DayPickerInput
            value={from}
            placeholder="check in"
            format="YYYY-MM-DD"
            formatDate={formatDate}
            parseDate={parseDate}
            inputProps={{
              readonly: 'readonly'
            }}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: new Date(), after: to },
              toMonth: to,
              modifiers,
              numberOfMonths: 2,
              onDayClick: () => this.to.getInput().focus(),
            }}
            onDayChange={this.handleFromChange}
          />
          <span className="InputFromTo-to">
            <DayPickerInput
              ref={(el) => (this.to = el)}
              value={to}
              placeholder="check out"
              format="YYYY-MM-DD"
              formatDate={formatDate}
              parseDate={parseDate}
              inputProps={{
                readOnly: 'readOnly'
              }}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { before: from },
                modifiers,
                month: from,
                fromMonth: from,
                numberOfMonths: 2,
              }}
              onDayChange={this.handleToChange}
            />
          </span>
          <Helmet>
            <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
    
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
    position:absolute
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
    position:'absolute'
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
`}</style>
          </Helmet>
        </div>
      </>
    );
  }
}
