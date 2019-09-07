import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import Backdrop from '../backdrop/Backdrop';

const Sidedrawer = () => {
  const dispatch = useDispatch()
  const showSidedrawer = useSelector(state => state.navigation.toggleSidedrawer);
  const toggleSearch = () => dispatch(actions.toggleSearch());
  const toggleSideDrawer = useCallback(() => dispatch(actions.toggleSidedrawer()), [dispatch]);

  useEffect(() => {

    const clickHandler = (e) => {
      const className = e.target.className;
      switch(className) {
        case 'Sidedrawer__link':
        case 'Sidedrawer__link Sidedrawer__link--active':
        case 'Sidedrawer__search':
          toggleSideDrawer();
          break;
        default:
          break;
      }

    }
    window.addEventListener('click', clickHandler);


  }, [dispatch, toggleSideDrawer])
  const sideDrawer = (
    <div className="Sidedrawer Sidedrawer--close">
      <div className="Sidedrawer__content">
        <h1 className="Sidedrawer__title">Menu</h1>
        <ul className="Sidedrawer__list">
          <li className="Sidedrawer__item">
            <NavLink className="Sidedrawer__link" activeClassName="Sidedrawer__link--active" to="/pokemon-list">
              Pokemon List
            </NavLink>
          </li>
          <li className="Sidedrawer__item">
            <span className="Sidedrawer__search" onClick={toggleSearch}>Search</span>
          </li>
        </ul>
      </div>
    </div>
  )
  return (
    <React.Fragment>
      <Backdrop show={showSidedrawer} click={toggleSideDrawer} />
      {showSidedrawer && sideDrawer}
    </React.Fragment>
  );
}
 
export default Sidedrawer;