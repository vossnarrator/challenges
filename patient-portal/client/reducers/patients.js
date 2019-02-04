import axios from "axios";

const GET_PATIENTS = "GET_PATIENTS";
const GET_PATIENT = "GET_PATIENT";
const DECLINE_APPT = "DECLINE_APPT";
const CREATE_APPT = "CREATE_APPT";

export const patients = patients => ({
  type: GET_PATIENTS,
  patients
});

export const patient = patient => ({
  type: GET_PATIENT,
  patient
});

export const declineAppt = appt => ({
  type: DECLINE_APPT,
  appt
});

export const createAppt = appt => ({
  type: CREATE_APPT,
  appt
});

export const fetchPatients = () => dispatch =>
  axios
    .get("/api/patients/")
    .then(res => dispatch(patients(res.data)))
    .catch(() => dispatch(patients(null)));

export const declineRequest = (id, message) => dispatch =>
  axios
    .put(`/api/appointments/${id}`, { status: "declined", message })
    .then(res => dispatch(declineAppt(res.data)))
    .catch(() => dispatch(declineAppt(null)));

export const createRequest = appt => dispatch =>
  axios
    .post(`/api/appointments/`, appt)
    .then(res => dispatch(createAppt(res.data)))
    .catch(() => dispatch(createAppt(null)));

const patientsReducer = (state = null, action) => {
  let newState;
  switch (action.type) {
    case GET_PATIENTS:
      newState = action.patients;
      break;
    case DECLINE_APPT:
      const patient = state.find(
        patient => patient.id === action.appt.patient_id
      );
      const updatedAppts = patient.appointments.filter(
        appt => appt.id !== action.appt.id
      );
      updatedAppts.push(action.appt);
      patient.appointments = updatedAppts;
      newState = state.filter(patient => patient.id !== action.appt.patient_id);
      newState.push(patient);
      break;
    case CREATE_APPT:
      newState = action.appt.slice();
      break;
    default:
      return state;
  }
  return newState;
};

export const getPatients = state => state.patients;
export const getPatientById = (state, id) =>
  state.patients ? state.patients.find(patient => patient.id === id) : null;

export const getPatientByUserId = (state, id) =>
  state.patients
    ? state.patients.find(patient => patient.user_id === id)
    : null;

export default patientsReducer;
