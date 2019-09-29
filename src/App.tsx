import React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './constants'
import { client } from './graphlClient'

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <ApolloProvider client={client}>
                <Router>
                    <Switch>
                        <Route
                            path='/app/'
                            exact
                            component={() => <div></div>}
                        />
                    </Switch>
                </Router>
            </ApolloProvider>
        </ThemeProvider>
    )
}

export default hot(App)
