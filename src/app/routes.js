import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'app/components/App';
// import Home from 'app/views/Home';
import PlacesView from 'app/views/Places';
import PlaceView from 'app/views/Place';


export default function getRoutes(store) { // eslint-disable-line no-unused-vars
  return (
    <Route path="/" component={App}>
      <IndexRoute component={PlacesView} />
      <Route path="/places" component={PlacesView} />
      <Route path="/places/:id" component={PlaceView} />
      <Route path="*" component={null} status={404} />
    </Route>
  );
}
