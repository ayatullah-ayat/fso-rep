import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'

import { configureStore } from '@reduxjs/toolkit'

import { Provider } from 'react-redux';
import noteReducer from './reducers/noteReducer';
import filterReducer, { filterChange } from './reducers/filterReducer';

const store = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer
    }
});

store.subscribe(() => console.log(store.getState()))

store.dispatch(filterChange('IMPORTANT'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
