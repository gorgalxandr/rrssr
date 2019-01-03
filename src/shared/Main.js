import React, { PureComponent } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// import fetchPopularRepos, { loadData } from '../api'
import routes from  '../routes'
import NoMatch from './NoMatch'
import '../styles/main'

console.log('[ routes ]', routes)

export default class Main extends PureComponent {
  render() {
    return (
      <main role='application'>
        <div className='App main-layout content-wrapper'>
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
          </Switch>
        </div>
      </main>
    )
  }
}

/*
  <Route 
    render={props => <NoMatch {...props} />}
  />
*/