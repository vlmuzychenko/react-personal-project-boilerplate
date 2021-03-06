//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Instruments
import Styles from './styles.scss';
import classNames from 'classnames';
import TransactionsModal from '../../components/TransactionsModal';
import { Transition } from 'react-transition-group';
import TweenMax from 'gsap';

export default class Controls extends Component {
    static propTypes = {
        filterSelect:   PropTypes.func.isRequired,
        transactionAdd: PropTypes.func.isRequired
    };

    constructor () {
        super();
        this.handleMoneyIn = ::this._handleMoneyIn;
        this.handleMoneyOut = ::this._handleMoneyOut;
        this.handleModalClose = ::this._handleModalClose;
        this.handleTransactionAdd = ::this._handleTransactionAdd;
        this.fadeFromTop = ::this._fadeFromTop;
    }

    state = {
        filterQuery:     '',
        isModalOpen:     false,
        transactionType: ''
    };

    filterSelect (type) {
        this.setState({
            filterQuery: type
        });

        this.props.filterSelect(type);
    }

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

    _fadeFromTop () {
        const { container } = this;

        TweenMax.fromTo(
            container,
            0.5,
            { y: -40, opacity: 0 },
            { y: 0, opacity: 1 }
        );
    }

    render () {
        const { isModalOpen } = this.state;

        const btnOutClasses = classNames(
            Styles.controls__btn,
            Styles.controls__btn_out
        );

        const btnInClasses = classNames(
            Styles.controls__btn,
            Styles.controls__btn_in
        );

        const btnInComeClasses = classNames(
            Styles.controls__btn,
            Styles.controls__btn_income
        );

        const btnOutComeClasses = classNames(
            Styles.controls__btn,
            Styles.controls__btn_outcome
        );

        const btnAllClasses = classNames(
            Styles.controls__btn,
            Styles.controls__btn_all
        );

        return (
            <div>
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
                        <button
                            className = { btnAllClasses }
                            type = 'button'
                            onClick = { () => this.filterSelect('') }
                        />
                        <button
                            className = { btnInComeClasses }
                            type = 'button'
                            onClick = { () => this.filterSelect('inCome') }
                        />
                        <button
                            className = { btnOutComeClasses }
                            type = 'button'
                            onClick = { () => this.filterSelect('outCome') }
                        />
                    </div>
                </div>
                <div className = { isModalOpen ? Styles.modalWrap : null }>
                    <Transition
                        in = { isModalOpen }
                        timeout = { 500 }
                        onEnter = { this.fadeFromTop }>
                        <div
                            className = { Styles.modalContainer }
                            ref = { (container) => this.container = container }>
                            <TransactionsModal
                                closeModal = { this.handleModalClose }
                                openModal = { isModalOpen }
                                transactionAdd = { this.handleTransactionAdd }
                                type = { this.state.transactionType }
                            />
                        </div>
                    </Transition>
                </div>
            </div>
        );
    }
}
