//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Instruments
import Styles from './styles.scss';
import { getUniqueID } from '../../helpers';

export default class ExchangeRate extends Component {
    static propTypes = {
        buy:  PropTypes.array.isRequired,
        ccy:  PropTypes.array.isRequired,
        sale: PropTypes.array.isRequired
    };

    render () {
        const { buy, ccy, sale } = this.props;

        const rate = [];

        for (let i = 0; i < buy.length; i++) {
            rate.push(
                <div
                    className = { Styles.exchange }
                    key = { getUniqueID(15) }>
                    <h4 className = { Styles.exchange__title }> { ccy[i] }: </h4>
                    <p className = { Styles.exchange__value }>
                        { Math.round(buy[i] * 100) / 100 } / { Math.round(sale[i] * 100) / 100 }
                    </p>
                </div>
            );
        }

        return (
            <div className = { Styles.exchangeContainer }>
                { rate }
            </div>
        );
    }
}
