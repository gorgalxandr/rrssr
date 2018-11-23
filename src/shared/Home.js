import React from 'react'
import './home.styl'

export default function Home(props) {
  const { title } = props
  return (
    <div className='home'>
      {title}
    </div>
  )
}