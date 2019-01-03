import React, { PureComponent } from 'react'
import { func, node, any } from 'prop-types'
import Loader from './Loader'
import isClient from '../utils/isClient'

class AsyncImport extends PureComponent {
  static propTypes = {
    load: func.isRequired,
    children: any.isRequired
  }

  state = {
    component: null,
    serverRender: false
  }

  toggleFoucClass() {
    if (!this.state.serverRender) {
      if (isClient && document.body.classList.contains('fouc')) {
        const fouc = document.getElementsByClassName('fouc')
        while (fouc.length) {
          fouc[0].classList.remove('fouc')
        }
      } else {
        console.log('Server styles rendering ...')
      }
    }
  }

  componentWillMount() {
    if (!this.state.serverRender) {
      this.toggleFoucClass()
    }
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

  // Ran as a way to resolve multiple setState()s
  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.match.params.id !== this.props.match.params.id) {
      // console.log('REDRAW REQUIRED')
    // }
    if (prevState.component !== null) {
      console.log(`Componentloaded`, JSON.stringify(prevProps, null, 2))
    }

    if (prevState.component === null) {
      this.setState(() => ({
        serverRender: true
      }))
    }
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
