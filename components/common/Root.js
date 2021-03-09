import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";
import Web3Connect from 'web3connect';
import configs from '../../configs';
import * as appAction from '../../redux/actions/appActions';
import { createWeb3User, providerOptions, w3connect } from '../../utils/web3Connect';
import './styles/ReactToastify.scss';

const Root = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const w3c = new Web3Connect.Core({
			network: configs.network,
			providerOptions,
			cacheProvider: true
		});

		if (w3c.cachedProvider) {
			initCurrentUser(w3c);
		}

		dispatch(appAction.updateDataContract({ web3Connect: w3c }));
	}, []);

	const subscribeProvider = async (w3c) => {
		try {
			const provider = await w3c.connect();

			if (!provider.on) {
				return;
			}

			dispatch(appAction.updateDataContract({ provider }));

			provider.on("close", () => resetApp(w3c));

			provider.on("accountsChanged", async (accounts) => {
				dispatch(appAction.updateDataUser({ address: accounts[0] }));
			});

			provider.on("chainChanged", async (chainId) => {
				if (Number(chainId) !== configs.chainId) {
					alert(
						`Please switch Web3 to the correct network and try signing in again. Detected network: ${configs.network
						}, Required network: ${configs.network}`
					);
					resetApp(w3c);
				} else {
					initCurrentUser(w3c);
				}
			});

			provider.on("connect", () => {
				console.log("connect");
			});

			provider.on("disconnect", (code, reason) => {
				console.log("disconnect");
				resetApp(w3c);
			});
		} catch (error) {

		}
	}

	const resetApp = async (w3c) => {
		if (w3c && w3c.currentProvider && w3c.currentProvider.close) {
			await w3c.currentProvider.close();
		}
		await w3c.clearCachedProvider();
		dispatch(appAction.updateDataUser({ address: null }));
	}

	const initCurrentUser = async (web3Connect) => {
		try {
			const w3c = await w3connect(web3Connect);
			const chainId = await w3c.web3.eth.net.getId();

			if (chainId === configs.chainId) {
				const [account] = await w3c.web3.eth.getAccounts();

				const user = createWeb3User(account);
				dispatch(appAction.updateDataUser({ address: user.username }));
				subscribeProvider(web3Connect);
			}
		} catch (e) {
			console.error(`Could not log in with web3`);
		}
	}

	return (
		<>
			<ToastContainer
				position="bottom-center"
				pauseOnFocusLoss={false}
				hideProgressBar={true}
			/>
		</>
	);
}

export default Root;