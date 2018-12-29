import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import App from '../shared/App'

render(
  <AppContainer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('app')
);

// Hot-reloading
if (module.hot) {
  module.hot.accept()
}