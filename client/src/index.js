import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {Provider} from "react-redux"
import store, {persistor} from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import {BrowserRouter as Router} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Router>
    <App />
    </Router>
    </PersistGate> 
    </Provider>
);

