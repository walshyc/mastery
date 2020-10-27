import { GET_SCORE_DATA, GET_USERS, SET_LOADING, ADD_SELECTION } from "./Types";
const AppReducer = (state, action) => {
  switch (action.type) {
    case GET_SCORE_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
};
export default AppReducer;
