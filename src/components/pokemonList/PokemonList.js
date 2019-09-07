import React, { Suspense } from 'react';
import { Route, withRouter } from 'react-router-dom';
import ErrorBoundary from '../errorBoundary/errorBoundary';

const Generations = React.lazy(() => import('./generations/Generations'))
const Lists = React.lazy(() => import('./lists/Lists'));
const PokemonList = (props) => {

  const loader = (
    <div className="Loader">
      <div className="Loader__content">Loading</div>
    </div>
  )

  return ( 
    <section className="section-pokemonList">
      <Suspense fallback={loader}>
        <ErrorBoundary>
          <Generations />
          <Route path="/pokemon-list/:id" component={Lists} />
        </ErrorBoundary>
      </Suspense>
    </section>

   );
}
 
export default withRouter(PokemonList);