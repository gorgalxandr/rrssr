import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import routes from  '../routes'
import Header from './Header'
import Footer from './Footer'
// import NoMatch from './NoMatch'
import '../styles/main'

console.log('[ routes ]', routes)

export default class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
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
        <Footer/>
      </React.Fragment>
    )
  }
}

/*
  <Route 
    render={props => <NoMatch {...props} />}
  />
*/