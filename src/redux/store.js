// REDUX
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: localStorage if web, AsyncStorage if react-native
import rootReducer from './reducers';
import middlewares from './middlewares';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app'], // only navigation will be persisted
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* Enable redux dev tools only in development.
 * We suggest using the standalone React Native Debugger extension:
 * https://github.com/jhen0409/react-native-debugger
 */
/* eslint-disable no-undef */
const enhancers = [applyMiddleware(...middlewares)];
const composeEnhancers =
  (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(...enhancers);
/* eslint-enable no-undef */

const initialState = window.__INITIAL_STATE__;
const store = createStore(persistedReducer, initialState, enhancer);
const persistor = persistStore(store, null, () => {
  store.getState(); // if you want to get restoredState
});

// Enable Webpack hot module replacement for reducers
if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(
      persistReducer(persistConfig, nextRootReducer)
    );
  });
}

export const configureStore = () => {
  return { persistor, store };
};
export default store;
