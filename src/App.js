import React from 'react';

import Layout from './hoc/Layout';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import PokemonList from './components/pokemonList/PokemonList';
import Details from './components/details/Details';
import Home from './components/home/Home';

function App() {
  return (
    <Router basename='my-pokemon-app'>
      <Layout />
      <main className="App">
        <Switch>
          <Route path="/pokemon-list" component={PokemonList} />
          <Route path="/:name" component={Details} />
          <Route path="/" exact component={Home} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
