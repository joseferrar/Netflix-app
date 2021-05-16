import axios from "axios";
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  TRANDING_REQUEST,
  TRANDING_SUCCESS,
  TRANDING_ERROR,
} from "../constants/types";

import { api_key, APP_URL } from "../apis";

export const Increment = () => {
  return {
    type: INCREMENT,
  };
};

export const Decrement = () => {
  return {
    type: DECREMENT,
  };
};

export const Popular_movies = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_DATA_REQUEST,
    });
    axios
      .get(`${APP_URL}/movie/popular/?api_key=${api_key}&language=en-US&page=1`)
      .then((response) => {
        dispatch({
          type: FETCH_DATA_SUCCESS,
          payload: response.data.results,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_DATA_ERROR,
          payload: error,
        });
      });
  };
};

export const Tranding_items = () => {
  return (dispatch) => {
    dispatch({
      type: TRANDING_REQUEST,
    });
    axios
      .get(`${APP_URL}/tv/popular?api_key=${api_key}&language=en-US&page=1`)
      .then((response) => {
        dispatch({
          type: TRANDING_SUCCESS,
          payload: response.data.results,
        });
      })
      .catch((error) => {
        dispatch({
          type: TRANDING_ERROR,
          payload: error,
        });
      });
  };
};
