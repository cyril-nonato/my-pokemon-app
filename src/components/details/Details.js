import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import Bar from './Bar';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import Loader from '../loader/Loader';


const Details = props => {

  const dispatch = useDispatch();

  const willUnmount = useRef(false)

  const loading = useSelector(state => state.search.loading);

  const pokemonDetails = useSelector(state => state.search.pokemonDetails);

  const pokemonEvoImages = useSelector(state => state.search.pokemonEvoImages);

  console.log(pokemonEvoImages);

  useEffect(() => {
    return () => {
      willUnmount.current = true;
    }
    
  }, []);


  useEffect(() => {
    if (!willUnmount.current) {
      dispatch(actions.searchPokemon(props.match.params.name))
    }
  
  }, [props.match.params.name, dispatch]);

  useEffect(() => {
    if(!willUnmount.current && pokemonDetails) {
      dispatch(actions.speciesURL(pokemonDetails['species_url']))
    }
  }, [pokemonDetails, dispatch])


  let details = <Loader />
  if(pokemonDetails && pokemonEvoImages && !loading) {
    details = (
      <section className="section-details">
        <div className="Details">
          <h1 className="Details__heading">Pokemon Details</h1>
          <div className="Details__card">
              <img className="Details__image" src={pokemonDetails.sprites} alt="Pokemon" />
              <div className="Details__types">
                {pokemonDetails.types.map(t => <span key={t} className={`Details__type Details__type--${t}`}>{t}</span>)}
              </div>
              <h3 className="Details__title">{pokemonDetails.name}</h3>
              <ul className="Details__list">
                <li className={`Details__item`}>
                  <span className="Details__text">Hp</span>
                  <Bar num={pokemonDetails.stats.hp} />
                  <span className="Details__value">{pokemonDetails.stats.hp}</span>
                </li>
                <li className={`Details__item`}>
                  <span className="Details__text">Atk</span>
                  <Bar num={pokemonDetails.stats.attack} />
                  <span className="Details__value">{pokemonDetails.stats.attack}</span>
                </li>
                <li className={`Details__item`}>
                  <span className="Details__text">Def</span>
                  <Bar num={pokemonDetails.stats.defense} />
                  <span className="Details__value">{pokemonDetails.stats.defense}</span>
                </li>
                <li className={`Details__item`}>
                  <span className="Details__text">Sp.Atk</span>
                  <Bar num={pokemonDetails.stats['special-attack']} />
                  <span className="Details__value">{pokemonDetails.stats['special-attack']}</span>
                </li>
                <li className={`Details__item`}>
                  <span className="Details__text">Sp.Def</span>
                  <Bar num={pokemonDetails.stats['special-defense']} />
                  <span className="Details__value">{pokemonDetails.stats['special-defense']}</span>
                </li>
                <li className={'Details__item'}>
                  <span className="Details__text">Spd</span>
                  <Bar num={pokemonDetails.stats.speed} />
                  <span className="Details__value">{pokemonDetails.stats.speed}</span>
                </li>
              </ul>
          </div>
        </div>
        <div className="EvoDetails">
          <h2 className="EvoDetails__heading">{pokemonDetails.name}'s evolution family</h2>
          <ul className="EvoDetails__list">
            {pokemonEvoImages.map(pokemon => {
              return (
                <li key={pokemon.name} className="EvoDetails__item">
                  <Link className="EvoDetails__link" to={`/${pokemon.name}`}>
                    <img className="EvoDetails__image" src={pokemon.sprite} alt="pokemon.name"/>
                    <span className="EvoDetails__text">{pokemon.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    )
  }

  return ( 
      <ErrorBoundary>
        {details};
      </ErrorBoundary>
  )
}
 
export default withRouter(Details);