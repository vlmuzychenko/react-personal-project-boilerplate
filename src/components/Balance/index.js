//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Instruments
import Styles from './styles.scss';
import classNames from 'classnames';
import TransactionsModal from '../../components/TransactionsModal';

export default class Balance extends Component {
    static propTypes = {
        balance:        PropTypes.number.isRequired,
        transactionAdd: PropTypes.func.isRequired
    };

    constructor () {
        super();
        this.handleMoneyIn = ::this._handleMoneyIn;
        this.handleMoneyOut = ::this._handleMoneyOut;
        this.handleModalClose = ::this._handleModalClose;
        this.handleTransactionAdd = ::this._handleTransactionAdd;
    }

    state = {
        isModalOpen:     false,
        transactionType: ''
    };

    _handleMoneyIn () {
        this.setState({
            isModalOpen:     true,
            transactionType: 'inCome'
        });
    }

    _handleMoneyOut () {
        this.setState({
            isModalOpen:     true,
            transactionType: 'outCome'
        });
    }

    _handleModalClose () {
        this.setState({
            isModalOpen:     false,
            transactionType: ''
        });
    }

    _handleTransactionAdd (newTransaction) {
        this.props.transactionAdd(newTransaction);
    }

    render () {
        const { balance } = this.props;

        const btnOutClasses = classNames(
            Styles.controls__btn,
            Styles.controls__btn_out
        );

        const btnInClasses = classNames(
            Styles.controls__btn,
            Styles.controls__btn_in
        );

        return (
            <div className = { Styles.balance } >
                <div className = { Styles.balance__container } >
                    <h1 className = { Styles.balance__title } > Total </h1>
                    <p className = { Styles.balance__value } > { balance } UAH </p>
                </div>
                <div className = { Styles.controls }>
                    <div className = { Styles.controls__container }>
                        <button
                            className = { btnOutClasses }
                            type = 'button'
                            onClick = { this.handleMoneyOut }>
                            <span>-</span>
                        </button>
                        <button
                            className = { btnInClasses }
                            type = 'button'
                            onClick = { this.handleMoneyIn }>
                            <span>+</span>
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <TransactionsModal
                    closeModal = { this.handleModalClose }
                    openModal = { this.state.isModalOpen }
                    transactionAdd = { this.handleTransactionAdd }
                    type = { this.state.transactionType }
                />
            </div>
        );
    }
}
