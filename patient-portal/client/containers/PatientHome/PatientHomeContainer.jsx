import React from "react";
import { connect } from "react-redux";

import {
  fetchPatients,
  getPatientByUserId,
  declineRequest
} from "../../reducers/patients";
import { login } from "../../reducers/auth";
import PatientHome from "./PatientHome";

class PatientHomeContainer extends React.Component {
  componentDidMount() {
    if (!this.props.patient) {
      this.props.fetchPatients().then(() => this.forceUpdate());
      //todo: need to remove this, just doing this for now for ease of debugging
      this.props
        .login("ginny@example.com", "1234")
        .then(() => this.forceUpdate());
    }
  }

  render() {
    if (!this.props.patient) {
      return <div>loading</div>;
    }

    return (
      <PatientHome
        patient={this.props.patient}
        declineRequest={(id, message) => {
          this.props.declineRequest(id, message).then(() => {
            this.forceUpdate();
          });
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPatients: () => dispatch(fetchPatients()),
  declineRequest: (id, message) => dispatch(declineRequest(id, message)),
  login: (email, password) => dispatch(login(email, password))
});

const mapStateToProps = state => {
  const patient = getPatientByUserId(state, state.user ? state.user.id : "");
  return { patient };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientHomeContainer);
