import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import Loader from '../../loader/Loader';

const Lists = props => {
  const dispatch = useDispatch();

  const pokemonLists = useSelector(state => state.pokemonList.list);

  const filteredPokemonList = useSelector(state => state.pokemonList.filterList);

  const loading = useSelector(state => state.pokemonList.loading)

  const [filterName, setFilterName] = useState('');
  const isUnmount = useRef(false);

  // Cancels get request upon unmount
  useEffect(() => {

    return () => {
      isUnmount.current = true;
    }
  }, [])

  // Gets pokemon list
  useEffect(() => {
    if(!isUnmount.current) dispatch(actions.getPokemonList(props.match.params.id));

  }, [props.match.params.id, dispatch])

  // Filter Pokemon List
  useEffect(() => {
    if(filterName) {
       dispatch(actions.pokemonListFilter(filterName)) 
    } else {
      dispatch(actions.pokemonListClearFilter()) 
    }
  }, [filterName, dispatch])

  const unFilteredList = pokemonLists ? (
    <React.Fragment>
      <ul className="Lists__list">
        {pokemonLists.map(p => {
          return (
            <li key={p.name} className="Lists__item">
              <Link className="Lists__link" to={`/${p.name}`}>{p.name}</Link>
            </li>
            )
        })}
      </ul>
    </React.Fragment>
  ) : null;

  const list = filteredPokemonList ? (
    <React.Fragment>
      <ul className="Lists__list">
        {filteredPokemonList.map(p => {
          return (
            <li key={p.name} className="Lists__item">
              <Link className="Lists__link" to={`/${p.name}`}>{p.name}</Link>
            </li>
            )
        })}
      </ul>
    </React.Fragment>

  ) : unFilteredList

  return ( 
    <div className="Lists">
        {!loading && <input type="text" className="Lists__input" value={filterName} onChange={e => setFilterName(e.target.value)}/>}
        {loading ? <Loader /> : list}
    </div>
   );
}
 
export default withRouter(Lists);