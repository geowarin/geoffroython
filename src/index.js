import DOM from 'react-dom';
import React from 'react';
import store from './core/store';
import App from './App.js';

import './css/main.css'

const rootNode = <App store={store} />;
DOM.render(rootNode, document.getElementById('root'));
