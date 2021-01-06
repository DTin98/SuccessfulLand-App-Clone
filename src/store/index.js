import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import ReduxPromise from 'redux-promise';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import * as createHistory from "history";

import reducers from './reducers';
import rootSaga from './sagas';

const historyRouter = createHistory.createBrowserHistory();
const logger = createLogger({});
const sagaMiddleware = createSagaMiddleware();

const middleWare = [thunk, sagaMiddleware, ReduxPromise, routerMiddleware(historyRouter)];

if (process.env.NODE_ENV === 'development') {
	middleWare.push(logger);
}

const createRootReducer = (history) => persistCombineReducers(
	{key: 'qwepio', storage}, 
	{router: connectRouter(history), ...reducers}
);

/*const createRootReducer = (history) => combineReducers(
  {router: connectRouter(history), ...reducers}
);*/

export const store = createStore(
  createRootReducer(historyRouter),
  compose(
    applyMiddleware(...middleWare)
  )
);

export const persistor = persistStore(store);  
export const history = historyRouter;

sagaMiddleware.run(rootSaga);
