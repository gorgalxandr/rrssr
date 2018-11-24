import React from 'react'
import '../styles/home'

export default function Home(props) {
  const { title } = props
  return (
    <div className='home'>
      {title}
    </div>
  )
}