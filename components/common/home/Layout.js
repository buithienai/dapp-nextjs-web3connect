import Head from 'next/head';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Root from '../Root';
import '../styles/ReactToastify.scss';

class Layout extends Component {
	renderContent = () => {
		const { classes } = this.props;

		return (
			<div className={classes}>
				{this.props.children}
			</div>
		);
	}

	render() {
		return (
			<>
				<Head>
					<title>ELD FARM</title>
					<meta name="description" content="Farm" />
					<meta name="author" content="ELD" />
					<meta name="keywords" content="blockchain consultant, startup, ethereum, Farmer" />
					<meta property="og:title" content="ELD FARM" />
					<meta property="og:url" content="https://eld.farm/" />
					<meta property="og:type" content="website" />
					<meta property="og:image" content="https://eld.farm/static/img/logo-256.png" />
					<meta property="og:site-name" content="ELD.Farm" />
					<meta property="og:description" content="ELD FARM" />
					<meta property="og:image:alt" content="ELD FARM" />
					<meta charSet="utf-8" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<link rel="icon" href="../../../static/img/favicon.png" />
					<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
					<link rel="stylesheet" href="../../../static/css/main.css" />
				</Head>
				<Root />
				{this.renderContent()}
				<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
				{/* <script src="../../../static/js/vconsole.min.js"></script>
				<script type="text/javascript" src="../../../static/js/myVconsole.js" /> */}
			</>
		);
	}
}

const mapStateToProps = state => ({
	userReducer: state.userReducer
});

export default connect(mapStateToProps)(Layout);
