import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList.jsx";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner.jsx";
import { toast } from "react-toastify";
class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    console.log("CDM");
    const { courses, actions, authors } = this.props;
    if (courses.length === 0) {
      console.log("CDM id c > 0 props courses", courses);
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }

  handleDeleteCourse = async (course) => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}
CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};
function mapStateToProps(state, ownProps) {
  //this determines what state is passed to this component via props
  //ownProps are props attached to this component
  return {
    //only data your components needs to avoid unnecessary re-render
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  //   return {
  //     createCourse: (course) => dispatch(courseActions.createCourse(course)),
  //   };
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
