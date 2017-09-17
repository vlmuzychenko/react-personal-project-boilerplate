//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Instruments
import Styles from './styles.scss';

export default class Balance extends Component {
    static propTypes = {
        balance: PropTypes.number.isRequired
    };

    formatBalance = (str) => {
        const nStr = String(str);
        const x = nStr.split('.');
        let x1 = x[0];
        const x2 = x.length > 1 ? `.${x[1]}` : '';
        const rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1'
                + ','
                + '$2');
        }

        return x1 + x2;
    };

    render () {
        const { balance } = this.props;

        return (
            <div className = { Styles.balance } >
                <div className = { Styles.balance__container } >
                    <h1 className = { Styles.balance__title } > Total </h1>
                    <p className = { Styles.balance__value } > { this.formatBalance(balance) } UAH </p>
                </div>
            </div>
        );
    }
}
