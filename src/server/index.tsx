import express from 'express';
import fetch from 'node-fetch';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App';

const schema = gql `
    type Query {
        me: User
        user(id: ID!): User
    }

    type User {
        id: ID!
        username: String!
    }
`;
const resolvers = {
    Query: {
        me: () => {
            return {
                id: '2',
                username: 'Franz Ferdinand'
            };
        },
        user: () => {
            return {
                id: '1',
                username: 'Freedie Mercury, Roger Taylor, John Deacon, Brian May'
            };
        }
    }
};

// create the Apollo server
const server = new ApolloServer({
    typeDefs: schema,
    resolvers
});

const app = express();

server.applyMiddleware({ app, path: '/graphql'});

// to use index.html from the public folder
app.use(express.static('public'));
app.use((req, res) => {
    // create the link  
    const link = new HttpLink({
        fetch: fetch as any,
        uri: 'http://localhost:8000/graphql',
        credentials: 'same-origin'
    });

    // create an Apollo Client instance on the server
    const client = new ApolloClient({
        ssrMode: true,
        cache: new InMemoryCache(),
        link
    });

    const ServerApp = (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );

    getDataFromTree(ServerApp).then(() => {
        const content = renderToString(ServerApp);
        res.status(200);
        res.send(`<!doctype html>\n${content}`);
        res.end();
    });    
});

app.listen({ port: 8000 }, () => {
    console.log('Apollo server on http://localhost:8000/graphql');
});
