import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';
import Unit from "./modules/unit";
import Product from "./modules/product";
import MostFavourableCalculator from './modules/mostFavourableCalculator';
import './MostFavourable.css';
import './Button.css';
import 'sweetalert/dist/sweetalert.css';

class MostFavourable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            alertMessage :'',
            units: [new Unit("Litro", 1000), new Unit("ML", 1), new Unit("Metro", 100), new Unit("Centímetro", 1)],
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

        var resultMessage = `O mais favorável é comprar ${result.mostFavourable.amount} ${result.mostFavourable.unit.label} por R$ ${result.mostFavourable.price}, você economiza R$ ${result.savedMoney} em cada ${result.mostFavourable.amount} ${result.mostFavourable.unit.label}`

        this.setState({alertMessage: resultMessage, showAlert: true});
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

        return (

            <div className="content">



                <div className="products">


                    <div className="poster">

                        <p className="titulo-produto">#Produto 1</p>

                        <div className="inline-form">
                            <label >R$</label>
                            <input
                                type="number" className="holo" step="0.01" name="price1" onChange={this.handleInputChange}

                                id="price1-label" />
                        </div>
                        <div className="inline-form">

                            <input
                                type="number" className="holo" step="0.01" name="amount1" onChange={this.handleInputChange}

                                id="amount1-label" />


                            <select
                                id="unit1-label"

                                name="unit1" value={this.state.unit1} onChange={this.handleInputChange}>
                                {
                                    this.state.units.map((u) => {
                                        return <option value={u.label} key={u.label + "1"}>{u.label}</option>
                                    })
                                }
                            </select>

                        </div>



                    </div>

                    <div className="poster">


                        <p className="titulo-produto">#Produto 2</p>

                        <div className="inline-form">

                            <label>R$</label>
                            <input
                                type="number" step="0.01" name="price2" onChange={this.handleInputChange}
                                className="holo"
                                id="price2-label" />
                        </div>
                        <div className="inline-form">
                            <input
                                type="number" step="0.01" name="amount2" onChange={this.handleInputChange}
                                className="holo"
                                id="amount2-label" />



                            <select
                                id="unit2-label"
                                name="unit2" value={this.state.unit2} onChange={this.handleInputChange}>
                                {
                                    this.state.units.map((u) => {
                                        return <option value={u.label} key={u.label + "1"}>{u.label}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>

                </div>

                <button className="button blue" onClick={() => this.compare()}>
                    Comparar</button>

                <SweetAlert
                    show={this.state.showAlert}
                    title="Resultado"
                    text={this.state.alertMessage}
                    onConfirm={() => this.setState({ showAlert: false })}
                />

            </div>
        )
    }
}

export default MostFavourable;