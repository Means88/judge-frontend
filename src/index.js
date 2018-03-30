import './styles/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
