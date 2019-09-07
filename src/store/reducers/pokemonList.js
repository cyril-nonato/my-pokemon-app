import * as actionTypes from '../actions/actionTypes';

const initialState = {
  generations: [1,2,3,4,5,6,7],
  loading: false,
  list: null,
  filterName: null,
  filteredList: null
}

const pokemonListInit = ( state, action ) => {
  return {
    ...state,
    list: null,
    filterName: null,
    loading: true
  }
}

const pokemonListSuccess = ( state, action ) => {
  return {
    ...state,
    loading: false,
    list: action.pokemonList
  }
} 

const pokemonListFail = ( state, action ) => {
  return {
    ...state,
    loading: false,
  }
}

const pokemonListFilter = ( state , action ) => {
  const filterList = state.list.filter(pokemon => pokemon.name.includes(action.filterName));
  return {
    ...state,
    filterName: action.filterName,
    filterList
  }
}

const pokemonListClearFilter = ( state, action ) => {
  return {
    ...state,
    filterList: null
  }
}

const reducer = ( state = initialState, action ) => {
  switch(action.type) {
    case actionTypes.POKEMON_LIST_INIT: return pokemonListInit(state, action);
    case actionTypes.POKEMON_LIST_SUCCESS: return pokemonListSuccess(state, action);
    case actionTypes.POKEMON_LIST_FAIL: return pokemonListFail(state, action);
    case actionTypes.POKEMON_LIST_FILTER: return pokemonListFilter(state, action);
    case actionTypes.POKEMON_LIST_CLEAR_FILTER: return pokemonListClearFilter(state, action);
    default: return state;
  }
}

export default reducer;