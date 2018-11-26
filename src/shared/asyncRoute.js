import React, { Component } from 'react'
import { func, node } from 'prop-types'

import Loader from './Loader'

class AsyncImport extends Component {
  static propTypes = {
    load: func.isRequired,
    children: node.isRequired
  }

  state = {
    component: null
  }

  toggleFoucClass() {
    const root = document.getElementById('app')

    if (root.hasClass('fouc')) {
      root.removeClass('fouc')
    } else {
      root.addClass('fouc')
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
