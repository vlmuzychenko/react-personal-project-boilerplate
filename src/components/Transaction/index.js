//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Instruments
import Styles from './styles.scss';
import moment from 'moment';

export default class Transaction extends Component {
    static propTypes = {
        category: PropTypes.string.isRequired,
        created:  PropTypes.number.isRequired,
        type:     PropTypes.string.isRequired,
        value:    PropTypes.number.isRequired
    };

    formatValue = (str) => {
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
        const {
            category,
            created,
            type,
            value
        } = this.props;

        return (
            <div className = { Styles.transaction }>
                <span
                    className = {
                        type === 'inCome' ?
                            Styles.transaction__income : Styles.transaction__outcome
                    }>i</span>
                <div className = { Styles.transaction__content }>
                    <h3 className = { Styles.transaction__title }>
                        {category}
                    </h3>
                    <span className = { Styles.transaction__date }>
                        { moment.unix(created).format('MMMM D h:mm a') }
                    </span>
                </div>
                <p className = { Styles.transaction__value }> { this.formatValue(value) } UAH</p>
            </div>
        );
    }
}
