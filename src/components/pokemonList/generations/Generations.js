import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

const Generations = (props) => {
  const generations = useSelector((state) => {
    return state.pokemonList.generations;
  });
  
  const genList = (
    <ul className="Generations__list">
    {generations.map(gen => 
      <li className="Generations__item" key={gen}>
        <NavLink activeClassName="Generations__link--active" className="Generations__link" to={`${props.match.path}/${gen}`}>{gen}</NavLink>
      </li>)}
    </ul>
  )

  return ( 
    <div className="Generations">
      <h1 className="Generations__title">Generations</h1>
      {genList}
    </div>

   );
}
 
export default withRouter(Generations);