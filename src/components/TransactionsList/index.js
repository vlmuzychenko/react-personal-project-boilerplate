//Core
import React, { Component } from 'react';

//Instruments
import Styles from './styles.scss';

export default class TransactionsList extends Component {
    render () {
        return (
            <section className = { Styles.transactionsList }>
                <div className = { Styles.transactionsList__container }>
                    <h1>transactions</h1>
                </div>
            </section>
        );
    }
}
