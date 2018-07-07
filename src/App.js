import React, { Component } from 'react';
import './style.css';
import Pais from './Pais';
import Departamento from './Departamento';

class App extends Component {

  render() {
    return (
      <div>
        <h1>Elecciones presidenciales 2018</h1>
        <div className="one">
          <h3>Por deparamento</h3>
          <Pais />
        </div>
        <div className="two">
          <h3>Por municipio</h3>
          <Departamento />
        </div>
      </div>
    );
  }
}

export default App;
