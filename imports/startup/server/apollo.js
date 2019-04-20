import { ApolloServer } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';
import merge from 'lodash/merge';
import UsersSchema from './../../api/users/User.graphql'
import UsersResolver from './../../api/users/resolvers';

// ADDING SCHEMA TO APOLLO
const typeDefs = [UsersSchema];

// MERGING RESOLVERS
const resolvers = merge(UsersResolver);


// INITIATING APOLLO SERVER AND LINKING USER TO CONTEXT
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		return ({
			user: await getUser(req.headers.authorization)
		})

	}
})

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql'
})

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end()
  }
})