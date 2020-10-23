import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { createCourse } from "./../../redux/actions/courseActions";
import { bindActionCreators } from "redux";
class CoursesPage extends Component {
  state = {
    course: {
      title: "",
    },
  };

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.actions.createCourse(this.state.course);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {
  //this determines what state is passed to this component via props
  //ownProps are props attached to this component
  return {
    //only data your components needs to avoid unnecessary re-render
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  //   return {
  //     createCourse: (course) => dispatch(courseActions.createCourse(course)),
  //   };
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
