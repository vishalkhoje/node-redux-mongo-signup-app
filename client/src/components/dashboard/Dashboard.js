import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { ReactMUIDatatable } from "react-material-ui-datatable";
import data from "../../servicejson/projectDetails.json";

const jsonData = data;

class Dashboard extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    //call API to get project details then show to the table
  }

  render() {
    const { user } = this.props.auth;
    const projectNameArr = [];
    const taskArr = [];
    const prjColumns = [
      {
        name: "status",
        label: "Status"
      },
      {
        name: "task_name",
        label: "Todo"
      },
      {
        name: "developer",
        label: "Developer"
      }
    ];
    const columns = [];
    jsonData.forEach((resdata, index) => {
      projectNameArr[index] = Object.entries(resdata).map(([projectName, taskData]) => {
        taskArr.push(taskData);
        columns.push({
          name: projectName, label: <ReactMUIDatatable
            title={projectName}
            data={taskData}
            columns={prjColumns}
            selectable={false}
            searchable={false}
            filterable={false}
            page={0}
            sort={[
              { columnName: 'status', direction: 'ASC' },
            ]}
            options={options} />
        });
        return false;
      });
    });

    const options = {
      selectableRows: true,
      selectableRowsOnClick: true
    };

    return (
      <div style={{ height: "75vh" }} className="container">
        <div className="row">
          <div className="landing-copy col s12">
            <h4>
              <b>Hey Admin,</b> {user.name.split(" ")[0]}
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-small waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <ReactMUIDatatable
              data={projectNameArr}
              columns={columns}
              selectable={false}
              searchable={false}
              filterable={false}
              options={options} />
          </div>
        </div>



      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
