import React, { PureComponent } from 'react'
import { NavLink} from 'react-router-dom'
import links from './Links'
// import '../styles/layout/navbar'

export default class Navbar extends PureComponent {
  render() {
    // const languages = [{
    //   name: 'All',
    //   param: 'all'
    // }, 
    // {
    //   name: 'JS',
    //   param: 'javascript',
    // }, 
    // {
    //   name: 'Ruby',
    //   param: 'ruby',
    // }, 
    // {
    //   name: 'Python',
    //   param: 'python',
    // }, 
    // {
    //   name: 'Java',
    //   param: 'java',
    // },
    // {
    //   name: 'Typescript',
    //   param: 'typescript',
    // }]

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
