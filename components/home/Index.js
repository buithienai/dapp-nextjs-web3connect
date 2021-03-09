import React, { Component } from 'react';
import { connect } from 'react-redux';
import configs from '../../configs';
import * as appAction from '../../redux/actions/appActions';
import { createWeb3User, w3connect } from '../../utils/web3Connect';
import Layout from '../common/home/Layout';

class Home extends Component {
    handleConnect = async () => {
        const { web3Connect } = this.props.contractReducer;
        try {
            const w3c = await w3connect(web3Connect);
            const chainId = await w3c.web3.eth.net.getId();

            if (chainId !== configs.chainId) {
                alert(
                    `Please switch Web3 to the correct network and try signing in again. Detected network: ${configs.network
                    }, Required network: ${configs.network}`,
                );
            } else {
                const [account] = await w3c.web3.eth.getAccounts();
                const user = createWeb3User(account);
                this.props.updateDataUser({ address: user.username });
            }
        } catch (err) {
            console.log('web3Connect error', err);
        }
    }

    handleDisconnect = async () => {
        const { web3Connect } = this.props.contractReducer;
        if (web3Connect && web3Connect.currentProvider && web3Connect.currentProvider.close) {
            await web3Connect.currentProvider.close();
        }
        await web3Connect.clearCachedProvider();
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