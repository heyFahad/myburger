import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './ContactData.css';
import Loader from '../../../components/UI/Loader/Loader';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const order = {
            ingredients: { ...this.props.ingredients },
            price: this.props.price.toFixed(2),
            customer: {
                name: 'Fahad Javed',
                email: 'fahad@email.com',
                address: {
                    street: 'Inside Shahdullah Gate',
                    city: 'Gujrat',
                    postalCode: 50700,
                    country: 'Pakistan'
                }
            },
            deliveryMethod: 'Fastest'
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
                <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
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
