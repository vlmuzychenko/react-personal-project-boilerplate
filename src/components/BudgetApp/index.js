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
        isOpen:       false,
        transactions: []
    };

    _handleTransactionAdd (newTransaction) {
        this.setState({
            transactions: [newTransaction, ...this.state.transactions],
            balance:      this.state.balance + newTransaction.value
        });
    }

    render () {
        const transactionList = this.state.transactions.map(
            ({ category, type, value, _id }) => (
                <Transaction
                    category = { category }
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
                    onTransactionAdd = { this.handleTransactionAdd }
                />
                { transactionList }
            </section>
        );
    }
}
