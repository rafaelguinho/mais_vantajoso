import React, { Component } from 'react';
import Unit from "./modules/unit";
import Product from "./modules/product";
import MostFavourableCalculator from './modules/mostFavourableCalculator';

class MostFavourable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            units: [new Unit("Litro", 1000), new Unit("ML", 1)],
            price1: null,
            amount1: null,
            unit1: 'Litro',
            price2: null,
            amount2: null,
            unit2: 'Litro',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    compare() {

        var products = [new Product(this.state.price1, this.state.amount1, this.getUnit(this.state.unit1)),
        new Product(this.state.price2, this.state.amount2, this.getUnit(this.state.unit2))
        ];

        var calculator = new MostFavourableCalculator(products);
        var result = calculator.compare();

        console.log(result);
    }

    getUnit(label) {
        var found = this.state.units.find(function (element) {
            return element.label == label;
        });

        return found;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (<div>
            <div>
                <input type="number" step="0.01" name="price1" onChange={this.handleInputChange} ></input>
                <input type="number" step="0.01" name="amount1" onChange={this.handleInputChange} ></input>

                <select name="unit1" value={this.state.unit1} onChange={this.handleInputChange}>
                    {
                        this.state.units.map((u) => {
                            return <option value={u.label} key={u.label + "1"}>
                                {u.label}
                            </option>
                        })
                    }
                </select>
            </div>

            <div>
                <input type="number" step="0.01" name="price2" onChange={this.handleInputChange} ></input>
                <input type="number" step="0.01" name="amount2" onChange={this.handleInputChange} ></input>

                <select name="unit2" value={this.state.unit2} onChange={this.handleInputChange}>
                    {
                        this.state.units.map((u) => {
                            return <option value={u.label} key={u.label + "2"}>
                                {u.label}
                            </option>
                        })
                    }
                </select>
            </div>

            <div>
                <button onClick={() => this.compare()}>Comparar</button>
            </div>

        </div>)
    }
}

export default MostFavourable;