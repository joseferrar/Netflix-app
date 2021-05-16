import {
    TRANDING_REQUEST,
    TRANDING_SUCCESS,
    TRANDING_ERROR,
  } from "../constants/types";
  
  const initialValues = {
    loading: false,
    data: [],
    error: null,
  };
  
  const TrandingRenderer = (state = initialValues, action) => {
    switch (action.type) {
      case TRANDING_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case TRANDING_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case TRANDING_ERROR:
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
  
  export default TrandingRenderer;
  