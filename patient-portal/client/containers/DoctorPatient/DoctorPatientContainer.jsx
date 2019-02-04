import React from "react";
import { connect } from "react-redux";

import {
  fetchPatients,
  getPatientById,
  declineRequest
} from "../../reducers/patients";
import DoctorPatient from "./DoctorPatient";

class DoctorPatientContainer extends React.Component {
  componentDidMount() {
    if (!this.props.patient) {
      this.props.fetchPatients();
    }
  }

  render() {
    if (!this.props.patient) {
      return <div>loading</div>;
    }
    return (
      <DoctorPatient
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
  declineRequest: (id, message) => dispatch(declineRequest(id, message))
});

const mapStateToProps = (state, props) => {
  const patient = getPatientById(state, props.match.params.id);
  return { patient };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorPatientContainer);
