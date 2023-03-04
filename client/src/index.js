import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state';
import { configureStore } from '@reduxjs/toolkit';  //Used to create the redux store
import { Provider } from 'react-redux';  //Used to provide an element with a store
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';  //Allows the redux store to persist even if the user closes the tab
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { key: 'root', storage, version: 1 };  //Sets up the configuration for redux persist
const persistedReducer = persistReducer(persistConfig, authReducer);  //Sets up redux persist with our state
const store = configureStore({
  reducer: persistedReducer,  //adds our persisted reducer
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
      },  
    }),  //adds our middleware with our personal default middleware
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}> {/*  Allows store to be persisted and specifies which store */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


