import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';


export const pokemonListInit = () => {
  return {
    type: actionTypes.POKEMON_LIST_INIT
  }
}

export const pokemonListSuccess = (pokemonList) => {
  return {
    type: actionTypes.POKEMON_LIST_SUCCESS,
    pokemonList,
  }
}

export const getPokemonList = (id) => {
  return dispatch => {
    dispatch(pokemonListInit());
    axios.get(`/generation/${id}`)
      .then(res => {
        if(res) {
          dispatch(pokemonListSuccess(res.data['pokemon_species']))
        }
      })
  }
}

export const pokemonListFilter = (filterName) => {
  return {
    type: actionTypes.POKEMON_LIST_FILTER,
    filterName
  }
}

export const pokemonListClearFilter = () => {
  return {
    type: actionTypes.POKEMON_LIST_CLEAR_FILTER
  }
}