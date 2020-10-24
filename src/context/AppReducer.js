import { GET_SCORE_DATA, SET_LOADING } from "./Types";
const AppReducer = (state, action) => {
  switch (action.type) {
    case GET_SCORE_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false
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
