import Link from 'next/link';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../common/home/Layout';
import { customNumber } from '../../utils/common';
import configs from '../../configs';
import { w3connect, createWeb3User } from '../../utils/web3Connect';
import * as appAction from '../../redux/actions/appActions';

class Home extends Component {
    handleConnect = async () => {
        const { web3Connect } = this.props.contractReducer;
        try {
            const w3c = await w3connect(web3Connect);
            const [account] = await w3c.web3.eth.getAccounts();
            const user = createWeb3User(account);
            console.log('w3c', w3c);
            this.props.updateDataUser({ address: user.username });
        } catch (err) {
            console.log('web3Connect error', err);
        }
    }

    handleDisconnect = async () => {
        this.props.updateDataUser({ address: null });
    }

    renderContent = () => {
        const { address } = this.props.userReducer;

        if (!address) {
            return (
                <button onClick={this.handleConnect}>Sign in with web3</button>
            );
        }

        return (
            <div>
                <div>Address: {address}</div>
                <button onClick={this.handleDisconnect}>Disconnect</button>
            </div>
        );
    }

    render() {
        return (
            <Layout activeMenu={1} classes="page page-home">
                <div className="container">
                    <h1>web3connect</h1>
                    <br />
                    {this.renderContent()}
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    userReducer: state.userReducer,
    contractReducer: state.contractReducer
});

const mapDispatchToProps = dispatch => ({
    updateDataUser: (data) => dispatch(appAction.updateDataUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);