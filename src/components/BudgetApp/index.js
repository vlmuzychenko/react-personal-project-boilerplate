//Core
import React, { Component } from 'react';

//Instruments
import Styles from './styles.scss';
import Balance from '../../components/Balance';
import ExchangeRate from '../../components/ExchangeRate';
import Transaction from '../../components/Transaction';
import TweenMax from 'gsap';
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';

export default class BudgetApp extends Component {
    constructor () {
        super();
        this.handleTransactionAdd = ::this._handleTransactionAdd;
        this.fadeFromBottom = ::this._fadeFromBottom;
    }

    state = {
        balance:           1000,
        ccy:               [],
        buy:               [],
        sale:              [],
        isExchangeLoading: false,
        transactions:      []
    };

    componentWillMount () {
        this.getExchangeRates();

        const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
        const savedBalance  = JSON.parse(localStorage.getItem('balance'));

        if (savedTransactions) {
            this.setState({
                balance:      savedBalance,
                transactions: savedTransactions
            });
        }
    }

    componentDidUpdate () {
        const savedTransactions = JSON.stringify(this.state.transactions);
        const savedBalance = JSON.stringify(this.state.balance);

        localStorage.setItem('transactions', savedTransactions);
        localStorage.setItem('balance', savedBalance);
    }

    formatData = (data) => {
        const ccyRecord = [];
        const buyRecord = [];
        const saleRecord = [];

        for (let i = 0; i < data.length; i++) {
            if (['ccy', 'buy', 'sale'].every((x) => x in data[i])) {
                ccyRecord.push(data[i].ccy);
                buyRecord.push(data[i].buy);
                saleRecord.push(data[i].sale);
            }
        }
        this.setState({
            ccy:  ccyRecord,
            buy:  buyRecord,
            sale: saleRecord
        });
    };

    getExchangeRates = () => {
        fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3', {
            method: 'GET'
        })
            .then((response) => {
                this.setState({
                    isExchangeLoading: true
                });

                return response;
            })
            .then((response) => {
                if (response.status !==200) {
                    throw new Error('Posts were not loaded.');
                }

                return response.json();
            })
            .then((response) => response)
            .then((data) => {
                this.formatData(data);
            })
            .then(() => this.setState({ isExchangeLoading: false }));
    };

    _handleTransactionAdd (newTransaction) {
        const { balance, transactions } = this.state;

        this.setState({
            transactions: [newTransaction, ...transactions],
            balance:      balance + newTransaction.value
        });
    }

    _fadeFromBottom () {
        const { container } = this;

        TweenMax.fromTo(
            container,
            0.5,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1 }
        );
    }

    render () {
        const transactionList = this.state.transactions.map(
            ({ category, created, type, value, _id }) => (
                <CSSTransition
                    classNames = { {
                        enter: Styles.transactionEnter,

                        enterActive: Styles.transactionEnterActive
                    } }
                    key = { _id }
                    timeout = { 300 }>
                    <Transaction
                        category = { category }
                        created = { created }
                        key = { _id }
                        type = { type }
                        value = { value }
                    />
                </CSSTransition>
            )
        );

        return (
            <section className = { Styles.budgetApp }>
                <div className = { Styles.budgetAppHeader }>
                    <ExchangeRate
                        buy = { this.state.buy }
                        ccy = { this.state.ccy }
                        sale = { this.state.sale }
                        w = { this.state.isExchangeLoading }
                    />
                    <Balance
                        balance = { this.state.balance }
                        transactionAdd = { this.handleTransactionAdd }
                    />
                </div>
                <TransitionGroup>
                    { transactionList }
                </TransitionGroup>
            </section>
        );
    }
}
