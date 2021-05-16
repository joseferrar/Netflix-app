import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from "../constants/types";

const initialValues = {
  loading: false,
  data: [],
  error: null,
};

const HomeRenderer = (state = initialValues, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
        return state
  }
};

export default HomeRenderer;
