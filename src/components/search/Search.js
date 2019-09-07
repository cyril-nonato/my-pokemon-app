import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../../store/actions/index';
import Backdrop from '../backdrop/Backdrop';


const Search = (props) => {
  const [name, setName] = useState('');

  const toggleSearch = useSelector( state => state.navigation.toggleSearch);
  
  const dispatch = useDispatch();

  const handleSearch = (event => {
    event.preventDefault()
    dispatch(actions.toggleSearch());
    props.history.push(`/${name}`);
  });
  
  // For showing the toggle on / off
  const search = (
    <div className="Search">
      <div className="Search__content">
        <h3 className="Search__title">Search</h3>
        <form onSubmit={handleSearch} className="Search__form">
          <input value={name} onChange={(e) => setName(e.target.value.trim().toLowerCase())} type="text" className="Search__input"/>
          <button className="Search__submit" type="submit">
            <FontAwesomeIcon className="Search__icon" icon={faSearch} />
          </button>
        </form>
      </div>
    </div>
  )

  return ( 
    <React.Fragment>
      <Backdrop show={toggleSearch} click={() => dispatch(actions.toggleSearch())}>
      </Backdrop>
      {toggleSearch && search}
    </React.Fragment>
   );
}
 
export default withRouter(Search);