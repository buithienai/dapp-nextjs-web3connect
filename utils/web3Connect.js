
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import Web3Connect from 'web3connect';
import configs from '../configs';

const getChainIdName = (chainId) => {
    switch (chainId) {
        case 1:
            return 'Mainnet';
        case 3:
            return 'Ropsten';
        case 4:
            return 'Rinkeby';
        case 5:
            return 'Goerli';
        case 42:
            return 'Kovan';
        case 4447:
            return 'Ganache';
        default:
            return 'Unknown';
    }
};

export const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: configs.infuraURL.split('/').pop(),
        },
    },
};

export const w3connect = async (web3Connect) => {
    const provider = await web3Connect.connect();

    const web3 = new Web3(provider);

    const injectedChainId = await web3.eth.getChainId();

    if (injectedChainId !== +configs.chainId) {
        alert(
            `Please switch Web3 to the correct network and try signing in again. Detected network: ${configs.network
            }, Required network: ${configs.network}`,
        );
        throw new Error(
            `Injected web3 chainId: ${injectedChainId}, config: ${+configs.chainId}`,
        );
    }

    return { web3Connect, web3, provider };
};

export const signInWithWeb3 = async () => {
    // const infuraId = process.env.INFURA_URI.split('/').pop();

    console.log('+configs.chainId: ', +configs.chainId);
    const web3Connect = new Web3Connect.Core({
        network: configs.network, // optional
        providerOptions, // required
    });
    console.log('web3Connect: ', web3Connect);

    const provider = await web3Connect.connect();
    console.log('provider: ', provider);

    const web3 = new Web3(provider);
    console.log('web3: ', web3);

    const injectedChainId = await web3.eth.getChainId();
    console.log('injectedChainId: ', injectedChainId);

    const [account] = await web3.eth.getAccounts();
    console.log('account: ', account);

    if (injectedChainId !== +configs.chainId) {
        alert(
            `Please switch Web3 to the correct network and try signing in again. Detected network: ${getChainIdName(
                injectedChainId,
            )}, Required network: ${getChainIdName(+configs.chainId)}`,
        );
        throw new Error(
            `Injected web3 chainId: ${injectedChainId}, config: ${+configs.chainId}`,
        );
    }

    return { user: createWeb3User(account), provider };
};

export const createWeb3User = (accountAddress) => {
    return {
        type: 'web3',
        attributes: { 'custom:account_address': accountAddress },
        username: accountAddress,
    };
};