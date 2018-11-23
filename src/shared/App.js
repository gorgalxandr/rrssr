import React, { Component } from 'react'
import routes from  './routes'
import { Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import NoMatch from './NoMatch'
import NotFound from './NotFound'
import Home from './Home'
import Grid from './Grid'
// import NotFound from './NotFound'
import TodoList from './TodoList'
import { fetchPopularRepos } from './api'
import loadData from './loadData'

console.log('[ routes ]', typeof routes)
console.log('[ routes ]', routes)

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
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
      </div>
    )
  }
}

export default App