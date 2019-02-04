import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import LabeledText from "./LabeledText";

const PatientDetails = ({ patient }) => (
  <div className="patient-details">
    <LabeledText
      label="DOB"
      value={moment(patient.dateOfBirth).format("YYYY MM DD")}
    />
    <LabeledText label="Email address" value={patient.email} />
    <LabeledText label="Phone" value={patient.phoneNumber} />
    <LabeledText
      label="Address"
      value={getFormattedAddress(patient.address[0])}
    />
  </div>
);

const getFormattedAddress = address =>
  `${address.address}\n${address.city}, ${address.state} ${address.zip}`;

PatientDetails.propTypes = {
  patient: PropTypes.object
};

export default PatientDetails;
