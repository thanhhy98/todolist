import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import SelectProvider from './context/SelectContext';
import NotificationProvider from './context/notification/notiContext';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <NotificationProvider>
    <SelectProvider>
    <App />
    </SelectProvider>
    </NotificationProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
