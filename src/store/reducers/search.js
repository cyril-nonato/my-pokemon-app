import * as actionTypes from '../actions/actionTypes';

const initialState = {
  toggle: false,
  loading: false,
  pokemonDetails: null,
  pokemonEvoImages: [],
}

const searchInit = ( state, action ) => {
  return { 
    ...state, 
    pokemonEvoImages: [],
    pokemonDetails: null,
    loading: true
  }
}

const searchSuccess = ( state, action ) => {
  return {
    ...state,
    loading: false,
    pokemonDetails: action.details
  }
}

const evolutionImageSuccess = ( state, action ) => {
  const pokemonEvoImages = state.pokemonEvoImages;
  return {
    ...state,
    pokemonEvoImages: [...pokemonEvoImages, action.pokemonEvoImage]
  }
}

const reducer = ( state = initialState, action ) => {
  switch (action.type) {
    case actionTypes.SEARCH_INIT:
      return searchInit( state, action );
    case actionTypes.SEARCH_SUCCESS:
      return searchSuccess( state, action );
    case actionTypes.EVOLUTION_IMAGE_SUCCESS:
      return evolutionImageSuccess( state, action );
    default:
      return state;
  }
}

export default reducer;