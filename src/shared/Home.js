import React from 'react'
import '../styles/pages/home'

export default function Home(props) {
  const { title } = props
  return (
    <div className='home'>
      <div className='hero_txt_wrap'>
        <span>select</span>
        <span>a</span>
        <span>language</span>
      </div>
    </div>
  )
}