//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Instruments
import Styles from './styles.scss';

export default class Transaction extends Component {
    static propTypes = {
        category: PropTypes.string.isRequired,
        type:     PropTypes.string.isRequired,
        value:    PropTypes.number.isRequired
    };

    render () {
        const {
            category,
            type,
            value
        } = this.props;

        return (
            <div className = { Styles.transaction }>
                <h3 className = { Styles.transaction__title }> {category} </h3>
                <p className = { Styles.transaction__value }> {value} UAH</p>
            </div>
        );
    }
}
