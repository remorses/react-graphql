// import GraphQLClient from "apollo-boost"
import * as jwt from "jsonwebtoken"
import { LOCAL_STORAGE_TOKEN_KEY, GRAPHQL_ENDPOINT, GRAPHQL_TESTING_ENDPOINT, GRAPHQL_MOCKING_ENDPOINT } from "./constants"
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const uri = process.env.REACT_APP_TESTING
    ? GRAPHQL_MOCKING_ENDPOINT
    : process.env.NODE_ENV === 'production' ? GRAPHQL_ENDPOINT : GRAPHQL_TESTING_ENDPOINT

const httpLink = new HttpLink({ uri })

const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (token) {
        console.log("using token " + token)
    }
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    })

    // Call the next link in the middleware chain.
    return forward(operation)
})

const errorAlerter = onError((error) => {
    const errors = error.graphQLErrors.map(({ message }) => message)
    alert("graphql error:\n" + JSON.stringify(errors, null, "    "))
})

export const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink, errorAlerter]), // Chain it with the HttpLink
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "no-cache",
            errorPolicy: "ignore"
        },
        query: {
            fetchPolicy: "no-cache",
            errorPolicy: "all"
        }
    }
})
