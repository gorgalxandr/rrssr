import React, { PureComponent } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import links from './Links'
import '../styles/layout/navbar'

class Navbar extends PureComponent {
  render() {
    return (
      <header className='navbar navbar-default navbar-fixed-top navbar-transparent navbar-highlight-royal-blue'>
        <div className='container'>
          <div className='navbar-header'>
            <button 
              type='button' 
              className='navbar-toggle collapsed' 
              data-toggle='sidepanel' 
              data-target='#navbar-nav'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <ul className='nav'>
              {links.map(({ name, param }) => (
                <li key={param}>
                  <NavLink 
                    activeStyle={{fontWeight: 'bold'}} 
                    to={`/popular/${param}`}
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
              <NavLink 
                activeStyle={{fontWeight: 'bold'}} 
                to={`/todos`}
              >
                Todos
              </NavLink>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

export default withRouter(Navbar)