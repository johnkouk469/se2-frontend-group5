/*
    Imports the basic react components for the frontend
    Loads the DOM in a container
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {FocusStyleManager} from '@blueprintjs/core';
import App from './components/app';
import '@blueprintjs/core/lib/css/blueprint.css';
import './index.css';

// Enable behavior which hides focus styles during mouse interaction.
FocusStyleManager.onlyShowFocusOnTabs();

// Renders the react element of our app in the supplied container (root) 
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
