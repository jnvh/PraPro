import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import './styles/react-geo.css';
import  {TreeDrawer} from './typescript/TreeDrawer';


ReactDOM.render(
  <TreeDrawer />,
  document.getElementById('root')
);


reportWebVitals();
