import React from 'react'
import '../styles/footer'

export default function Footer(props) {
  const d = new Date()
  const year = d.getFullYear()

  return (
    <footer className='footer'>
      <section className='container'>
        <div className='copyright'>
          <div className='footer-text'>
            &copy;{ year } All rights reserved.
          </div>
        </div>
      </section>
    </footer>
  )
}