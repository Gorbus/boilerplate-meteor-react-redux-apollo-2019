import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import ForgotPassword from '../../ui/Accounts/ForgotPassword';
import Index from '../../ui/Index';
import Login from '../../ui/Accounts/Login';
import ResetPassword from '../../ui/Accounts/ResetPassword';
import Signup from '../../ui/Accounts/Signup';


class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" component={Index} exact={true} />
					<Route path="/login" component={Login} exact={true}/>
					<Route path="/signup" component={Signup} exact={true}/>
					<Route path="/verify-email/:token" render={(props) => {
						Accounts.verifyEmail(props.match.params.token, (error) => {
							if (error) {
								console.log(error.reason)
								console.log(error);
							} else {
								console.log('Email verified! Thanks!', 'success')
							}
						})
						return <Redirect to="/login" />
					}} />
					<Route path="/reset-password/:token" component={ResetPassword} />
					<Route path="/forgot-password" component={ForgotPassword} exact={true} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default Router;
