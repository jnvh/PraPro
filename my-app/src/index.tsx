import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import './react-geo.css';
import {Application} from './Application/RiskMap';

ReactDOM.render(
  <Application/>,
  document.getElementById('root')
);

reportWebVitals();
