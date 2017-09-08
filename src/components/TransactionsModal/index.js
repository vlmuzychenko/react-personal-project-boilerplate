//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Instruments
import Styles from './styles.scss';
import { getCurrentTime, getUniqueID } from '../../helpers';
import TweenMax from 'gsap';
import {
    Transition,
    TransitionGroup
} from 'react-transition-group';

export default class TransactionsModal extends Component {
    static propTypes = {
        closeModal:     PropTypes.func.isRequired,
        transactionAdd: PropTypes.func.isRequired,
        type:           PropTypes.string.isRequired,
        openModal:      PropTypes.bool
    };

    constructor () {
        super();
        this.handleCategoryEnter = ::this._handleCategoryEnter;
        this.handleValueEnter = ::this._handleValueEnter;
        this.handleTransactionAdd = ::this._handleTransactionAdd;
        this.resetState = ::this._resetState;
        this.handleModalClose = ::this._handleModalClose;
        this.modalIn = ::this._modalIn;
        this.modalOut = ::this._modalOut;
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
            _id:     getUniqueID(15),
            created: getCurrentTime(),
            type:    this.props.type,
            ...this.state
        };

        this.props.closeModal();
        this.props.transactionAdd(newTransaction);
        this.resetState();
    }

    _handleModalClose () {
        this.props.closeModal();

        this.resetState();
    }

    _modalIn () {
        const { container } = this;

        TweenMax.fromTo(
            container,
            0.7,
            { y: -40, opacity: 0 },
            { y: 0, opacity: 1 }
        );
    }

    _modalOut () {
        const { container } = this;

        TweenMax.fromTo(
            container,
            0.7,
            { y: 0, opacity: 1 },
            { y: -40, opacity: 0 }
        );
    }

    render () {
        const { openModal, type } = this.props;
        const { category } = this.state;

        if (!openModal) {
            return null;
        }

        return (
            <section className = { Styles.modal }>
                <Transition
                    in = { this.props.openModal }
                    timeout = { 700 }
                    onEnter = { this.modalIn }
                    onExit = { this.modalOut }>
                    <div
                        className = { Styles.modal__container }
                        ref = { (container) => this.container = container }>
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
                            onClick = { this.handleModalClose }>
                                Close
                        </button>
                    </div>
                </Transition>
            </section>
        );
    }
}
