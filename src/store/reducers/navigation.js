import * as actionTypes from '../actions/actionTypes';

const initialState = {
  toggleSearch: false,
  toggleSidedrawer: false,
  windowWidth: window.innerWidth
}

const toggleBars = ( state, action ) => {
  return {...state, windowWidth: action.width}
}

const toggleSearch = ( state, action ) => {
  return {...state, toggleSearch: !state.toggleSearch}
}

const toggleSideDrawer = ( state, action ) => {
  return {...state, toggleSidedrawer: !state.toggleSidedrawer}
}

const reducer = ( state = initialState, action ) => {
  switch(action.type) {
    case actionTypes.TOGGLE_BARS:
      return toggleBars( state, action );
    case actionTypes.TOGGLE_SEARCH:
      return toggleSearch( state, action );
    case actionTypes.TOGGLE_SIDEDRAWER:
      return toggleSideDrawer( state, action );
    default:
      return state;
  }
}

export default reducer;