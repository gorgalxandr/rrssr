import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// api(s)
import fetchPopularRepos, { loadData } from '../api'

// route(s)
import routes from  '../routes'

import Navbar from './Navbar'
import NoMatch from './NoMatch'

// style(s)
import '../styles/app'
import '../styles/layout/header'
import '../styles/layout/footer'

console.log('[ routes ]', routes)

class App extends Component {
  render() {
    return (
      <div className='App main-layout content-wrapper'>
        <Navbar/>
        <main>
          <Switch>
            {routes.map(({ 
              path, 
              exact, 
              component: Component, 
              ...rest
            }) => (
              <Route 
                key={path}
                path={path}
                exact={exact} 
                render={props => <Component {...props} {...rest} />} 
              />
            ))}
            <Route 
              render={props => <NoMatch {...props} />}
            />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App