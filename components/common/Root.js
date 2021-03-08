import React, { useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import Web3Connect from 'web3connect';
import configs from '../../configs';
import * as appAction from '../../redux/actions/appActions';
import { providerOptions, createWeb3User, w3connect } from '../../utils/web3Connect';
import './styles/ReactToastify.scss';
import { useDispatch } from 'react-redux'

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

		dispatch(appAction.updateDataContract({ web3Connect: w3c }))
	}, []);

	const initCurrentUser = async (web3Connect) => {
		let user;
		try {
			const w3c = await w3connect(
				web3Connect,
			);
			const [account] = await w3c.web3.eth.getAccounts();
			user = createWeb3User(account);
			dispatch(appAction.updateDataUser({ address: user.username }))
		} catch (e) {
			console.error(`Could not log in with web3`);
		}
	};

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