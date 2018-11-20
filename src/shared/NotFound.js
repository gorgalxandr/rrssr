import React, { Component } from 'react'
import { object, string } from 'prop-types'
import { Link } from 'react-router-dom'
import image404 from '../../images/404.gif'
import image500 from '../../images/500.jpg'
import './notFound.styl'

export default class NotFound extends Component {
  getImg() {
    if (this.props.params.splat === '500') {
      return <img src={image500} alt='' />
    } else {
      return <img src={image404} alt='' />
    }
  }
  render() {
    return (
      <div>
        <Link
          to='/'
          className={this.props.params.splat === '500'
          ? 'qbt-notFound qbt-notFount_500'
          : 'qbt-notFound'}
        >
          {this.getImg()}
        </Link>
      </div>
    )
  }
}

NotFound.propTypes = {
  type: string,
  params: object
}
