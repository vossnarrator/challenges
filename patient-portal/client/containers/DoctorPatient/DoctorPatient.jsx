import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Appointments from "../Appointments";
import PatientDetails from "../../components/PatientDetails";
import Files from "../../components/Files";
import { getFullName } from "../../util";
import CombinedAppointments from "../../components/CombinedAppointments";

const Patient = ({ patient, declineRequest }) => (
  <div className="container">
    <h2>{getFullName(patient)}</h2>
    <PatientDetails patient={patient} />
    <CombinedAppointments
      appts={patient.appointments}
      declineRequest={declineRequest}
      isDoctor
    />
    <div>
      <h3>Patient Files</h3>
      <Files files={[]} />
    </div>
  </div>
);

Patient.propTypes = {
  patient: PropTypes.object.isRequired,
  declineRequest: PropTypes.func
};

export default Patient;
