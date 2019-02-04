import React from "react";
import { connect } from "react-redux";

import {
  fetchPatients,
  getPatientByUserId,
  createRequest
} from "../../reducers/patients";
import { login } from "../../reducers/auth";
import NewApptRequest from "./NewApptRequest";

class NewApptRequestContainer extends React.Component {
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
      <NewApptRequest
        patient={this.props.patient}
        createRequest={(id, message) => {
          this.props.createRequest(id, message).then(() => {
            this.forceUpdate();
          });
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPatients: () => dispatch(fetchPatients()),
  createRequest: appt => dispatch(createRequest(appt)),
  login: (email, password) => dispatch(login(email, password))
});

const mapStateToProps = (state, props) => {
  const patient = getPatientByUserId(state, state.user ? state.user.id : "");
  return { patient };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewApptRequestContainer);
