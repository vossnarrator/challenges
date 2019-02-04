import React from "react";
import PropTypes from "prop-types";

import Appointment from "../components/Appointment";

const Appointments = ({ appointments, declineRequest, isDoctor }) => (
  <div>
    {appointments.map(appt => (
      <Appointment
        key={appt.id}
        appt={appt}
        declineRequest={declineRequest}
        isDoctor={isDoctor}
      />
    ))}
  </div>
);

Appointments.propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object),
  declineRequest: PropTypes.func.isRequired,
  isDoctor: PropTypes.bool.isRequired
};

export default Appointments;
