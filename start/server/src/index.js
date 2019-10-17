const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const LanuchAPI  = require('./datasources/launch');
const UserAPI  = require('./datasources/user');

const store = createStore();

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
        launchAPI: new LanuchAPI(),
        userAPI: new UserAPI({ store })
    })
 });

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});