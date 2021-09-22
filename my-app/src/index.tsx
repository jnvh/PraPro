import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import './react-geo.css';
import {RiskMap} from './Client/RiskMap';


ReactDOM.render(
  <RiskMap/>,
  document.getElementById('root')
);


reportWebVitals();
