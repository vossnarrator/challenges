import React, { Component } from "react";
import PropTypes from "prop-types";
import { DateField } from "react-date-picker";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

import "react-date-picker/index.css";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 300
  },
  formRow: {
    minWidth: 200,
    marginBottom: 20
  },
  dateLabel: {
    fontSize: 12
  }
};

class NewApptRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: "", // eslint-disable-line react/no-unused-state
      dateMoment: {} // eslint-disable-line react/no-unused-state
    };
  }

  onDateChange = e => {
    this.setState({ dateString: e });
  };

  onSubmit = () => {
    const newAppt = {
      datetime: this.state.dateString,
      status: "pending",
      purpose: "new appointment",
      patient_id: this.props.patient.id,
      doctor_id: "1b661765-0247-411f-af95-1386f70c2b85" //hard coding a doctor id
    };
    this.props.createRequest(newAppt);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <div>
          <h2>Request an Appointment</h2>
        </div>
        <form className={classes.form}>
          <div className={classes.formRow}>
            <div className={classes.dateLabel}>Date</div>
            <DateField
              dateFormat="YYYY-MM-DD hh:mm a"
              onChange={this.onDateChange}
            />
          </div>
          <Button variant="raised" color="primary" onClick={this.onSubmit}>
            Submit Request
          </Button>
        </form>
      </div>
    );
  }
}

NewApptRequest.propTypes = {
  classes: PropTypes.object.isRequired,
  createRequest: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired
};

export default withStyles(styles)(NewApptRequest);
