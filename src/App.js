import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import Todos from './components/Todos';
function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Todos />
      </Provider>
    </div>
  );
}

export default App;
