import moment from "moment";

export const getFullName = patient =>
  `${patient.firstName} ${patient.lastName}`;

export const getPendingAppointments = appointments =>
  appointments.filter(appt => appt.status === "pending");
export const getConfirmedAppointments = appointments =>
  appointments.filter(appt => appt.status === "confirmed");

export const getUpcomingAppointments = appointments =>
  getConfirmedAppointments(appointments).filter(appt =>
    moment(appt.datetime).isAfter(moment())
  );
export const getPastAppointments = appointments =>
  getConfirmedAppointments(appointments).filter(appt =>
    moment(appt.datetime).isBefore(moment())
  );
