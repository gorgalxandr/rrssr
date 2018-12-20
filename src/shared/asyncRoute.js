import React, { Component } from 'react'
import { func, node, any } from 'prop-types'
import Loader from './Loader'
import isClient from '../utils/isClient'

class AsyncImport extends Component {
  static propTypes = {
    load: func.isRequired,
    children: any.isRequired
  }

  state = {
    component: null
  }

  toggleFoucClass() {
    if (isClient && document.body.classList.contains('fouc')) {
    // if (isClient()) {
      document.body.classList.remove('fouc')
    } else {
      console.log('Component not usable on server')
    }
  }

  componentWillMount() {
    this.toggleFoucClass()
  }

  componentDidMount() {
    this.props.load()
      .then(component => {
        setTimeout(() => this.toggleFoucClass(), 0)
        this.setState(() => ({
          component: component.default
        }))
      })
  }

  render() {
    return this.props.children(this.state.component)
  }
}

const asyncRoute = importFunc =>
  props => (
    <AsyncImport load={importFunc}>
      {Component => {
        return Component === null
          ? <Loader />
          : <Component {...props} />
      }}
    </AsyncImport>
  )

export default asyncRoute
