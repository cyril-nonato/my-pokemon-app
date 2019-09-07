import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

// Start of obtaining pokemon details
export const searchInit = () => {
  return {
    type: actionTypes.SEARCH_INIT
  }
}

export const searchSuccess = (details) => {
  return {
    type: actionTypes.SEARCH_SUCCESS,
    details
  }
}
const getDetails = (data) => {
  const stats = {};
  data.stats.map(s => stats[s.stat.name] = s.base_stat);
  const details = {
    id: data.id,
    name: data.species.name,
    sprites: data.sprites.front_default,
    types: data.types.map(t => t.type.name),
    abilities: data.abilities,
    species_url: data.species.url,
    stats
  };

  return details;
}

/* Connecting to api end point */
export const searchPokemon = (name) => {
  return dispatch => {
    dispatch(searchInit());
    axios.get(`pokemon/${name}`)
      .then(res => {
        const details = getDetails(res.data)
        dispatch(searchSuccess(details))
      })
  }

}
// End of obtaining pokemon details

// Start of obtaining evolution details
export const evolutionImageInit = () => {
  return {
    type: actionTypes.EVOLUTION_IMAGE_INIT
  }
}

export const evolutionImageSuccess = (pokemonEvoImage) => {
  return {
    type: actionTypes.EVOLUTION_IMAGE_SUCCESS,
    pokemonEvoImage: pokemonEvoImage
  }
}

// Removes the backslash of the URL and convert it to array
const convertURLToArray = (url) => {
  return url.substr(0, url.length-1).split('/');
}

const getEvolutionChainDetails = (data) => {

  const secondEvolution = data.chain['evolves_to'].length ? data.chain['evolves_to'][0] : null;
  const thirdEvolution = secondEvolution ? secondEvolution['evolves_to'][0] : null;

  const firstEvolutionName = data.chain.species.name;
  const secondEvolutionName = secondEvolution ? secondEvolution.species.name : null;
  const thirdEvolutionName = thirdEvolution ? thirdEvolution.species.name : null;
  const pokemonEvoData = [firstEvolutionName, secondEvolutionName, thirdEvolutionName];

  return pokemonEvoData.filter(pokemon => pokemon);
}

const getEvolutionImage = (name, sprite) => {
  return {
    name,
    sprite
  }
}

/* Query to api end points */
const evolutionImages = (name) => {
  return dispatch => {
    axios.get(`pokemon/${name}`)
      .then(res => {
        const pokemonEvoImage = getEvolutionImage(name, res.data.sprites.front_default);
        dispatch(evolutionImageSuccess(pokemonEvoImage))
      });
  }
}

export const evolutionChainDetails = (url) => {
  const array = convertURLToArray(url);
  const id = array[array.length - 1];

  return dispatch => {
    axios.get(`/evolution-chain/${id}`)
      .then(res => {
        const pokemonEvoData = getEvolutionChainDetails(res.data);
        pokemonEvoData.forEach(pokemon => dispatch(evolutionImages(pokemon)));
      })
  }
} 

export const speciesURL = (url) => {
  const array = convertURLToArray(url);
  const id = array[array.length - 1];

  return dispatch => {
    axios.get(`pokemon-species/${id}`)
      .then(res => {
        dispatch(evolutionChainDetails(res.data['evolution_chain'].url))
      })
  }
}

// End of obtaining evolution details

export const clearDetails = () => {
  return {
    type: actionTypes.CLEAR_DETAILS
  }
}