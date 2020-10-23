import * as types from "../actions/actionTypes";

export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.course }]; //whatever is returned
    //from the reducer becomes the new state
    default:
      return state;
  }
}
