import React, { Component } from 'react'
import Loader from './Loader'
import '../styles/grid'

class Grid extends Component {
  constructor(props) {
    super(props)

    let repos
    if (__isBrowser__) {
      repos = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      repos = this.props.staticContext.data
    }

    this.state = {
      repos,
      loading: repos ? false : true,
    }

    this.fetchRepos = this.fetchRepos.bind(this)
  }

  componentDidMount() {
    if (!this.state.repos) {
      this.fetchRepos(this.props.match.params.id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchRepos(this.props.match.params.id)
    }
  }

  fetchRepos(lang) {
    this.setState(() => ({
      loading: true
    }))

    // Available only on the as prop route method 
    this.props.fetchInitialData(lang)
      .then(repos => this.setState(() => ({
        repos,
        loading: false,
      })))
  }

  render() {
    const { loading, repos } = this.state

    if (loading === true) {
      return <Loader/>
    }

    return (
      <div className='grid'>
        <ul>
          {repos.map(({
            name, 
            owner, 
            stargazers_count, 
            html_url 
          }) => (
            <li key={name} style={{margin: 30}}>
              <ul>
                <li><a href={html_url}>{name}</a></li>
                <li>@{owner.login}</li>
                <li>{stargazers_count} stars</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Grid