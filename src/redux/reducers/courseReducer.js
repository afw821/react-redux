import * as types from "../actions/actionTypes";
import initialState from "./initalState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSES_SUCCESS:
      return [...state, { ...action.course }]; //whatever is returned
    //from the reducer becomes the new state
    case types.UPDATE_COURSES_SUCCESS:
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      console.log("action.courses", action.courses);
      return action.courses;
    default:
      return state;
  }
}
