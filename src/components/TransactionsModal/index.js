//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Instruments
import Styles from './styles.scss';
import { getUniqueID } from '../../helpers';

export default class TransactionsModal extends Component {
    static propTypes = {
        type:             PropTypes.string.isRequired,
        onClose:          PropTypes.func.isRequired,
        onTransactionAdd: PropTypes.func.isRequired,
        opened:           PropTypes.bool
    };

    constructor () {
        super();
        this.handleCategoryEnter = ::this._handleCategoryEnter;
        this.handleValueEnter = ::this._handleValueEnter;
        this.handleTransactionAdd = ::this._handleTransactionAdd;
        this.resetState = ::this._resetState;
    }

    state = {
        category: '',
        value:    0
    };

    _resetState () {
        this.setState({
            category: '',
            value:    0
        });
    }

    _handleCategoryEnter (event) {
        this.setState({
            category: event.target.value
        });
    }

    _handleValueEnter (event) {
        const absValue = Math.abs(event.target.value);
        const { type } = this.props;

        this.setState({
            value: type === 'inCome' ? absValue : -absValue
        });
    }

    _handleTransactionAdd () {
        const newTransaction = {
            _id:  getUniqueID(15),
            type: this.props.type,
            ...this.state
        };

        this.props.onClose();
        this.props.onTransactionAdd(newTransaction);
        this.resetState();
    }

    render () {
        const { onClose, opened, type } = this.props;
        const { category } = this.state;

        if (!opened) {
            return null;
        }

        return (
            <section className = { Styles.modal }>
                <div className = { Styles.modal__container }>
                    <h2 className = { Styles.modal__title }>New { type === 'inCome' ? 'Income' : 'Outcome' }</h2>
                    <input
                        className = { Styles.modal__input }
                        placeholder = { type === 'inCome' ? 'Income category' : 'Outcome category' }
                        type = 'text'
                        value = { category }
                        onChange = { this.handleCategoryEnter }
                    />
                    <input
                        className = { Styles.modal__input }
                        placeholder = { type === 'inCome' ? 'Income value' : 'Outcome value' }
                        type = 'number'
                        onChange = { this.handleValueEnter }
                    />
                    <button
                        className = { Styles.modal__btn }
                        onClick = { this.handleTransactionAdd }>
                        Add
                    </button>
                    <button
                        className = { Styles.modal__close }
                        onClick = { onClose }>
                        Close
                    </button>
                </div>
            </section>
        );
    }
}
