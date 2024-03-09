import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import {DataProvider} from './components/GlobalState'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

      <App />
    </DataProvider>

  </React.StrictMode>,
document.getElementById('root')
)