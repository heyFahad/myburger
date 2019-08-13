import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withAxiosErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            }

            // setup axios interceptors to catch HttpRequest errors globally
            axios.interceptors.request.use(
                request => {
                    this.setState({
                        error: null
                    })
                    return request;
                },
                error => {
                    console.log(error);
                    return Promise.reject(error);
                }
            );
            axios.interceptors.response.use(
                response => response,
                error => {
                    console.log(error);
                    this.setState({
                        error: error
                    });
                    return Promise.reject(error);
                }
            );
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            });
        }

        render() {
            return (
                <React.Fragment>
                    <Modal
                        show={this.state.error}
                        clicked={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default withAxiosErrorHandler;
