// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import BudgetApp from '../../components/BudgetApp';

export default class App extends Component {

    render () {
        return (
            <section className = { Styles.app }>
                <BudgetApp />
            </section>
        );
    }
}
