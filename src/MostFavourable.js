import React, { Component } from 'react';
import Unit from "./modules/unit";
import Product from "./modules/product";
import MostFavourableCalculator from './modules/mostFavourableCalculator';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    marginBotton: {
        marginBotton: '30px',
    },
});


class MostFavourable extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

        alert(resultMessage);
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
            <div>
                <Typography variant="h3" component="h4">
                    Mais favorável
                    </Typography>
                <Grid container>
                    <Paper m="2rem" margin={3}>
                        <Grid container item spacing={3} >
                            <Grid item sm={4} xs={12}>
                                <InputLabel id="price1-label">Preço</InputLabel>
                                <TextField
                                    type="number" step="0.01" name="price1" onChange={this.handleInputChange}

                                    labelid="price1-label"
                                    id="standard-start-adornment" />
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <InputLabel id="amount1-label">Quantidade</InputLabel>
                                <TextField
                                    type="number" step="0.01" name="amount1" onChange={this.handleInputChange}

                                    labelid="amount1-label"
                                    id="standard-start-adornment" />
                            </Grid>
                            <Grid item sm={4} xs={12}>

                                <InputLabel id="unit1-label">Unidade de medida</InputLabel>
                                <Select
                                    labelid="unit1-label"

                                    name="unit1" value={this.state.unit1} onChange={this.handleInputChange}>
                                    {
                                        this.state.units.map((u) => {
                                            return <MenuItem value={u.label} key={u.label + "1"}>{u.label}</MenuItem>
                                        })
                                    }
                                </Select>

                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper m="2" >
                        <Grid container item spacing={3}>
                            <Grid item sm={4} xs={12}>
                                <InputLabel id="price2-label">Preço</InputLabel>
                                <TextField
                                    type="number" step="0.01" name="price2" onChange={this.handleInputChange}

                                    labelid="price2-label"
                                    id="standard-start-adornment" />
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <InputLabel id="amount2-label">Quantidade</InputLabel>
                                <TextField
                                    type="number" step="0.01" name="amount2" onChange={this.handleInputChange}

                                    labelid="amount2-label"
                                    id="standard-start-adornment" />
                            </Grid>
                            <Grid item sm={4} xs={12}>

                                <InputLabel id="unit2-label">Unidade de medida</InputLabel>
                                <Select
                                    labelid="unit2-label"

                                    name="unit2" value={this.state.unit2} onChange={this.handleInputChange}>
                                    {
                                        this.state.units.map((u) => {
                                            return <MenuItem value={u.label} key={u.label + "2"}>{u.label}</MenuItem>
                                        })
                                    }
                                </Select>

                            </Grid>
                        </Grid>
                    </Paper>

                    <Grid container direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Button variant="contained" color="primary" onClick={() => this.compare()}>
                            Comparar</Button>

                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default MostFavourable;