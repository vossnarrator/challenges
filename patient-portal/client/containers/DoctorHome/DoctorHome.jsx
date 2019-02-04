import React from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import Icon from "material-ui/Icon";
import Card from "material-ui/Card";
import { withStyles } from "material-ui/styles";

import PatientList from "../../components/PatientList";
import { getFullName } from "../../util";

const styles = {
  welcomeMessage: {
    color: "black"
  },
  searchWrapper: {
    padding: "5px 10px",
    width: 200,
    display: "flex",
    alignItems: "center"
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 7
  },
  search: {
    fontSize: 11
  },
  patients: {
    marginTop: 40
  }
};

class DoctorHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredList: props.patients.slice()
    };
  }

  onChange = e => {
    const searchTerm = e.target ? e.target.value.trim().toLowerCase() : "";
    const updatedList = this.props.patients.filter(
      patient =>
        getFullName(patient)
          .toLowerCase()
          .indexOf(searchTerm) > -1
    );
    this.setState({ filteredList: updatedList });
  };

  render() {
    return (
      <div className="container">
        <h2 className={this.props.classes.welcomeMessage}>{`Welcome back, Dr. ${
          this.props.doctor.lastName
        }.`}</h2>
        <div className={this.props.classes.patients}>
          {this.props.patients.length > 0 ? (
            <div>
              <Card className={this.props.classes.searchWrapper}>
                <Icon className={this.props.classes.searchIcon}>search</Icon>
                <TextField
                  name="search"
                  placeholder="Search patients"
                  className={this.props.classes.search}
                  inputProps={{ style: { fontSize: 12 } }}
                  onChange={this.onChange}
                />
              </Card>
              <PatientList patients={this.state.filteredList} />
            </div>
          ) : (
            <div>{"You don't have any patients."}</div>
          )}
        </div>
      </div>
    );
  }
}

DoctorHome.propTypes = {
  classes: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,
  patients: PropTypes.array.isRequired
};

export default withStyles(styles)(DoctorHome);
