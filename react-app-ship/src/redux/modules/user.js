import {
  getData,
} from '../utils/fetchApi';
import { handleResponse } from '../utils/errorHandler';
// ------------------------------------
// Constants
// ------------------------------------
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
const API_GET_CURRENT_USER = '/api/admin/user/current';

// ------------------------------------
// Actions
// ------------------------------------
export function deliverCurrentUserData(data) {
  return {
    type: GET_CURRENT_USER,
    data,
  };
}

export function fetchCurrentUserData() {
  return async(dispatch) => {
    const fetchResult = await getData(API_GET_CURRENT_USER);
    // success
    if (fetchResult.status) {
      dispatch(deliverCurrentUserData(fetchResult.data.data.currentUser));
    // error
    } else {
      dispatch(handleResponse(fetchResult));
    }
  };
}

export const actions = {
  deliverCurrentUserData,
  fetchCurrentUserData,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
export const ACTION_HANDLERS = {
  [GET_CURRENT_USER]: (state = {}, action) => ({
    ...state,
    currentUser: action.data,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentUser: {},
};

export default function shipOrderReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
