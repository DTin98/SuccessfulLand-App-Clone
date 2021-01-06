import './App.css';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
//import * as polygonData from './data/phuong.json';
import * as polygonData from './data/tinh.json';
import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import "leaflet/dist/leaflet.css";
import Header from './components/common/header'
import { Provider } from 'react-redux'
import {
  persistor,
  store,
  history
} from './store';
import Routes from './routes'
class App extends Component {
  

  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate loading={<div />} onBeforeLift={this.onBefore} persistor={persistor}>
          <ConnectedRouter history={history}>
            <Routes></Routes>
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default App;



