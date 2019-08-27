import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './ContactData.css';
import Loader from '../../../components/UI/Loader/Loader';
import axios from '../../../axios-orders';
import { isFlowBaseAnnotation } from '@babel/types';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const order = {
            ingredients: { ...this.props.ingredients },
            price: this.props.price.toFixed(2),
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        let form = (
            <form>
                <Input elementType="..." elementConfig="..." value="..." />
                <Input inputtype="input" type="email" name="email" placeholder="Your Mail" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postalCode" placeholder="Postal Code" />
                <Button btnType="Success" btnClicked={this.orderHandler}>OREDR NOW</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Loader />;
        }
        return (
            <div className={cssClasses.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
