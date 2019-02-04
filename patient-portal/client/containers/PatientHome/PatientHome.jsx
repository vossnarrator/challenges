import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "material-ui/Button";

import PatientDetails from "../../components/PatientDetails";
import Files from "../../components/Files";
import { withStyles } from "material-ui/styles";

import { getFullName } from "../../util";
import CombinedAppointments from "../../components/CombinedAppointments";

const styles = {
  buttonWrapper: {
    marginTop: 30
  },
  button: {
    color: "white",
    textDecoration: "none",
    fontSize: 12
  }
};

const PatientHome = ({ classes, patient, declineRequest }) => (
  <div className="container">
    <h2>{`Welcome back, ${getFullName(patient)}.`}</h2>
    <div className="profile">
      <div>
        <h3>Your Profile</h3>
        <PatientDetails patient={patient} />
      </div>
      <div className={classes.buttonWrapper}>
        <Button variant="raised" color="primary">
          <Link to="/request-appointment" className={classes.button}>
            Request Appointment
          </Link>
        </Button>
      </div>
    </div>
    <CombinedAppointments
      appts={patient.appointments}
      declineRequest={declineRequest}
      isDoctor={false}
    />
    <div>
      <h3>Your Files</h3>
      <Files files={[]} />
    </div>
  </div>
);

PatientHome.propTypes = {
  classes: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  declineRequest: PropTypes.func.isRequired
};

export default withStyles(styles)(PatientHome);
