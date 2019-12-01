import MostFavourableCalculator from './modules/mostFavourableCalculator.js';
import Product from './modules/product.js';
import Unit from './modules/unit.js';

import test from 'ava';

var unit = new Unit("litros", 1000);
var p1 = new Product(3.6, 2.5, unit);
var p2 = new Product(3, 2, unit);

var calculator = new MostFavourableCalculator([p1, p2]);

test('price by basic unit', t => {
	t.is(p1.priceByBasicUnit(), 0.00144);
});

test('amount by basic unit', t => {
	t.is(p1.amountByBasicUnit(), 2500);
});

test('price by unit amount', t => {
	t.is(p2.priceByBasicUnitAmount(2500), 3.75);
});

test('how much I will save', t => {
	t.is(calculator.compare().savedMoney, 0.15);
});

test('which one should I buy', t => {
	t.is(calculator.compare().mostFavourable, p1);
});