import React from "react";
import PropTypes from "prop-types";

import {
  getPendingAppointments,
  getPastAppointments,
  getUpcomingAppointments
} from "../util";
import Appointments from "../containers/Appointments";

const CombinedAppointments = ({ appts, declineRequest, isDoctor }) => {
  const pendingAppts = getPendingAppointments(appts);
  const pastAppts = getPastAppointments(appts);
  const upcomingAppts = getUpcomingAppointments(appts);
  return (
    <div>
      <div>
        <h3>Appointment Requests</h3>
        {pendingAppts.length > 0 ? (
          <Appointments
            appointments={pendingAppts}
            declineRequest={declineRequest}
            isDoctor={isDoctor}
          />
        ) : (
          <div>No appointment requests.</div>
        )}
      </div>
      <div>
        <h3>Upcoming Appointments</h3>
        {upcomingAppts.length > 0 ? (
          <Appointments
            appointments={upcomingAppts}
            declineRequest={declineRequest}
            isDoctor={isDoctor}
          />
        ) : (
          <div>No upcoming appointments.</div>
        )}
      </div>
      <div>
        <h3>Past Appointments</h3>
        {pastAppts.length > 0 ? (
          <Appointments
            appointments={pastAppts}
            declineRequest={declineRequest}
            isDoctor={isDoctor}
          />
        ) : (
          <div>No past appointments.</div>
        )}
      </div>
    </div>
  );
};

CombinedAppointments.propTypes = {
  appts: PropTypes.arrayOf(PropTypes.object),
  declineRequest: PropTypes.func.isRequired,
  isDoctor: PropTypes.bool.isRequired
};

export default CombinedAppointments;
