import React from 'react';
import { hydrate } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from './client';
import App from './App';

hydrate(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, document.getElementById('root')
);
