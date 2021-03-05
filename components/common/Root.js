import React, { useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import Web3Connect from 'web3connect';
import configs from '../../configs';
import * as appAction from '../../redux/actions/appActions';
import { providerOptions } from '../../utils/web3Connect';
import './styles/ReactToastify.scss';
import { useDispatch } from 'react-redux'

const Root = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const w3c = new Web3Connect.Core({
			network: configs.network,
			providerOptions,
			cacheProvider: true,
		});

		dispatch(appAction.updateDataContract({ web3Connect: w3c }))
	}, []);

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