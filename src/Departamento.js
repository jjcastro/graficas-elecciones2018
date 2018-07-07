import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VegaLite from 'react-vega-lite';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const VUELTAS = [
  {
    data: {"url": "./primera-vuelta-filtro.csv"},
    colors: [
      "rgb(238, 202, 59)",
      "rgb(84, 162, 75)",
      "rgb(114, 183, 178)",
      "rgb(228, 87, 86)",
      "rgb(245, 133, 24)",
      "rgb(76, 120, 168)",
      "rgb(240, 156, 249)"
    ],
    name: "Primera vuelta"
  },
  {
    data: {"url": "./segunda-vuelta-filtro.csv"},
    colors: [
      "rgb(84, 162, 75)",
      "rgb(228, 87, 86)"
    ],
    name: "Segunda vuelta"
  },
];

const DEPARTAMENTOS = [
  "Amazonas",
  "Antioquia",
  "Arauca",
  "Atlantico",
  "Bogotá D.C.",
  "Bolivar",
  "Boyaca",
  "Caldas",
  "Caqueta",
  "Casanare",
  "Cauca",
  "Cesar",
  "Choco",
  "Cordoba",
  "Cundinamarca",
  "Guainoa",
  "Guaviare",
  "Huila",
  "La Guajira",
  "Magdalena",
  "Meta",
  "Nariño",
  "Norte De Santander",
  "Putumayo",
  "Quindio",
  "Risaralda",
  "San Andres",
  "Santander",
  "Sucre",
  "Tolima",
  "Valle",
  "Vaupes",
  "Vichada"
];

class Departamento extends Component {
  constructor(props) {
    super();

    this.state = {
      selected: DEPARTAMENTOS[0],
      vuelta: 0,
      data: VUELTAS[0].data,
      spec: {
        "mark": "bar",
        "transform": [
          {"filter": {"field": "departamento", "equal": "Amazonas"}}
        ],
        "encoding": {
          "y": {
            "field": "votos",
            "type": "quantitative",
            "aggregate": "sum",
            "stack":  "normalize",
            "title": "Porcentaje de votos"
            },
          "x": {
            "field": "municipio",
            "type": "ordinal",
            "title": "Departamento"
          },
          "color": {
            "field": "candidato",
            "title": "Candidato",
            "type": "nominal",
            "order": {"aggregate": "sum", "field": "votos", "type": "quantitative"},
            "scale": {
              "range": VUELTAS[0].colors
            }
          }
        }
      }
    };

    this.toggle = this.toggle.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  toggle() {
    var newVuelta = this.state.vuelta == 1 ? 0 : 1;
    var currSpec = this.state.spec;
    currSpec.encoding.color.scale.range = VUELTAS[newVuelta].colors;
    this.setState({
      spec: currSpec,
      vuelta: newVuelta
    });
  }

  onSelect(val) {
    var currSpec = this.state.spec;
    currSpec.transform[0].filter.equal = val.value;
    console.log(currSpec);
    this.setState({
      selected: val,
      spec: currSpec
    });
  }

  render() {
    var newVuelta = this.state.vuelta == 1 ? 0 : 1;
    return (
      <div>
        <div className="container">
          <div className="thing">
            <VegaLite spec={this.state.spec} data={VUELTAS[this.state.vuelta].data} />
          </div>
          <div className="controles">
            <h2>{VUELTAS[this.state.vuelta].name}</h2>
            <Dropdown options={DEPARTAMENTOS} onChange={this.onSelect} value={this.state.selected} placeholder="Select an option" />
            <a className="button" onClick={this.toggle}>
              Ver {VUELTAS[newVuelta].name}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Departamento.propTypes = {
  data: PropTypes.object,
  spec: PropTypes.object
};

export default Departamento;
