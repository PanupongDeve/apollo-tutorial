import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import React from 'react';
import ReactDom from 'react-dom';
import gql from "graphql-tag";
import Pages from './pages';
import Login from './pages/login';
import injectStyles from './styles';
import { navigate } from "@reach/router";

import { resolvers, typeDefs } from './resolvers';


const IS_LOGGED_IN = gql`
        query IsUserLoggedIn {
            isLoggedIn @client
        }
`;

const IsLoggedIn = () => {
    const { data } = useQuery(IS_LOGGED_IN);
    if (data.isLoggedIn) {
        return <Pages />;
      }
    navigate(`/`);  
    return <Login />;
}


const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/',
    headers: {
        authorization: localStorage.getItem('token')
    }
});

const client = new ApolloClient({
    cache,
    link,
    resolvers,
    typeDefs
});

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token'),
        cartItems: [],
        
    }
})

injectStyles();
ReactDom.render(
    <ApolloProvider client={client}>
        <IsLoggedIn />
    </ApolloProvider>, document.getElementById('root')
);