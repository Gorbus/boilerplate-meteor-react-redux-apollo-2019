import 'unfetch/polyfill';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';
import configureStore from './../../redux/store/configureStore';
import { Provider } from 'react-redux';

import Router from './../both/router';

// REDUX STORE CREATION

const store = configureStore();

// APOLLO CLIENT CREATION

const client = new ApolloClient({
	uri: Meteor.absoluteUrl('graphql'),
	request: operation =>
		operation.setContext(() => ({
			headers: {
				authorization: Accounts._storedLoginToken()
			}
		}))
})

// APOLLO HOC TO CONNECT CLIENT

const ApolloApp = () => (
	<ApolloProvider client={client}>
		<Router />
	</ApolloProvider>
)

// REDUX HOC TO CONNECT STORE

const ReduxApp = () => (
	<Provider store={store}>
		<ApolloApp />
	</Provider>
)

// RENDERING APP TO DOM

Meteor.startup(() => {
	ReactDOM.render(<ReduxApp />, document.getElementById('app'));
})

//DEFAULT CONFIG FOR BERT ALERT MESSAGES 

Bert.defaults = {
	hideDelay: 3500,
	style: 'fixed-top',
	type: 'default'
};