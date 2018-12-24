import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './Navbar'
import NoMatch from './NoMatch'
// import NotFound from './NotFound'
// import Home from './Home'
// import Grid from './Grid'
// import TodoList from './TodoList'

// api(s)
import fetchPopularRepos, { loadData } from '../api'

// route(s)
import routes from  '../routes'

// style(s)
import '../styles/app'
import '../styles/layout/header'
import '../styles/layout/footer'

// log(s)
// console.log('[ routes ]', typeof routes)
console.log('[ routes ]', routes)

class App extends Component {
  render() {
    return (
      <div className='App'>
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