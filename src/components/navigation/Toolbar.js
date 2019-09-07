import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../../store/actions/index';


const Toolbar = () => {
  const dispatch = useDispatch();

  const windowWidth = useSelector(state => state.navigation.windowWidth);

  const toggleSearch = () => dispatch(actions.toggleSearch());
  const toggleSidedrawer = () => dispatch(actions.toggleSidedrawer());

  useEffect(() => {
    const getWindowWidth = () => dispatch(actions.getWindowWidth(window.innerWidth));
    window.addEventListener('resize', getWindowWidth);

  }, [dispatch]);

  const smallScreen = 
    <li className="Toolbar__item">
      <FontAwesomeIcon onClick={toggleSidedrawer} className="Toolbar__bars" icon={faBars} />
    </li>

    const largeScreen = (
      <React.Fragment>
        <li className="Toolbar__item">
          <NavLink className="Toolbar__link" activeClassName="Toolbar__link--active" to="/pokemon-list">
            Pokemon List
          </NavLink>
        </li>
        <li className="Toolbar__item">
            <span className="Toolbar__search" onClick={toggleSearch}>Search</span>
        </li>
      </React.Fragment>
    )

  return ( 
    <nav className="Toolbar">
      <Link className="Toolbar__brand" to="/">
        <span className="Toolbar__brand--main">P</span>
        <span className="Toolbar__brand--sub">okemon</span>
      </Link>   
      <ul className="Toolbar__list">
        {windowWidth > 600 && largeScreen}
        {windowWidth <= 600 && smallScreen}
      </ul>
    </nav>
   );
}

 
export default Toolbar;