//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Instruments
import Styles from './styles.scss';
import classNames from 'classnames';
import TransactionsModal from '../../components/TransactionsModal';
import TweenMax from 'gsap';
import { Transition } from 'react-transition-group';

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
        this.fadeFromTop = ::this._fadeFromTop;
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

    formatBalance = (str) => {
        const nStr = String(str);
        const x = nStr.split('.');
        let x1 = x[0];
        const x2 = x.length > 1 ? `.${x[1]}` : '';
        const rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1'
                + '.'
                + '$2');
        }

        return x1 + x2;
    };

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
        const { balance } = this.props;

        const { isModalOpen } = this.state;

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
                    <p className = { Styles.balance__value } > { this.formatBalance(balance) } UAH </p>
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
