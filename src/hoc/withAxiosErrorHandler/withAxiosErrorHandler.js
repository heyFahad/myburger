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
            this.reqInterceptor = axios.interceptors.request.use(
                request => {
                    this.setState({
                        error: null
                    })
                    return request;
                },
                error => {
                    return Promise.reject(error);
                }
            );
            this.resInterceptor = axios.interceptors.response.use(
                response => response,
                error => {
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

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
    }
}

export default withAxiosErrorHandler;
