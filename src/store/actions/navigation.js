import * as actionTypes from './actionTypes';

export const toggleSearch = () => {
  return {
    type: actionTypes.TOGGLE_SEARCH
  }
}

export const toggleBars = (width) => {
  return {
    type: actionTypes.TOGGLE_BARS,
    width
  }
}

export const toggleSidedrawer = () => {
  return {
    type: actionTypes.TOGGLE_SIDEDRAWER
  }
}

export const getWindowWidth = (width) => {
  return dispatch => {
      dispatch(toggleBars(width))

  }
}