import React from "react";
import { connect } from "react-redux";

import { fetchPatients, getPatients } from "../../reducers/patients";
import { login, getUser } from "../../reducers/auth";
import DoctorHome from "./DoctorHome";

class DoctorHomeContainer extends React.Component {
  componentDidMount() {
    this.props.fetchPatients();
    if (!this.props.user) {
      //todo: remove, store doesnt check if logged in via cookies or anythign so user only exists if going from the sign in page
      this.props.login("hermione@example.com", "1234");
    }
  }

  render() {
    if (!this.props.user || !this.props.patients) {
      return <div>loading</div>;
    }
    return (
      <DoctorHome doctor={this.props.user} patients={this.props.patients} />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPatients: () => {
    dispatch(fetchPatients());
  },
  login: (email, password) => {
    dispatch(login(email, password));
  }
});

const mapStateToProps = state => {
  const user = getUser(state);
  const patients = getPatients(state);
  return { user, patients };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorHomeContainer);
