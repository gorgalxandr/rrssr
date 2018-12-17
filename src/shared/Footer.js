import React from 'react'
import '../styles/footer'

export default function Footer(props) {
  const d = new Date()
  const year = d.getFullYear()

  return (
    <footer className='footer'>
      <section classNake='container'>
        <span className='footer-text'>
          &copy; { year } All rights reserved.
        </span>
      </section>
    </footer>
  )
}