//Core
import React, { Component } from 'react';

//Instruments
import Styles from './styles.scss';
import Balance from '../../components/Balance';
import Transaction from '../../components/Transaction';

export default class BudgetApp extends Component {
    constructor () {
        super();
        this.handleTransactionAdd = ::this._handleTransactionAdd;
    }

    state = {
        balance:      1000,
        transactions: []
    };

    componentWillMount () {
        this.getExchangeRates();
    }

    test = (data) => {
        for (const key in data) {
            console.log(key, data[key]);
        }
    };

    getExchangeRates = () => {
        fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3', {
            method: 'GET'
        })
            .then((response) => response)
            .then((result) => result.json())
            .then((data) => {
                this.test(data);
            });
    };

    _handleTransactionAdd (newTransaction) {
        const { balance, transactions } = this.state;

        this.setState({
            transactions: [newTransaction, ...transactions],
            balance:      balance + newTransaction.value
        });
    }

    render () {
        const transactionList = this.state.transactions.map(
            ({ category, created, type, value, _id }) => (
                <Transaction
                    category = { category }
                    created = { created }
                    key = { _id }
                    type = { type }
                    value = { value }
                />
            )
        );

        return (
            <section className = { Styles.budgetApp }>
                <Balance
                    balance = { this.state.balance }
                    transactionAdd = { this.handleTransactionAdd }
                />
                { transactionList }
            </section>
        );
    }
}
