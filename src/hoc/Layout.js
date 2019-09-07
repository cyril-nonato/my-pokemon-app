import React from 'react'
import Toolbar from '../components/navigation/Toolbar';
import Search from '../components/search/Search';
import Sidedrawer from '../components/navigation/Sidedrawer';

const Layout = () => {

  return ( 
    <React.Fragment>
      <Search />
      <Toolbar />
      <Sidedrawer />
    </React.Fragment>
   );
}
 
export default Layout;