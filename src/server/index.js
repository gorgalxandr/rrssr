import path from 'path'
import express from 'express'
import mcache from 'memory-cache'
import favicon from 'serve-favicon'
import cors from 'cors'
import React from 'react'
import {
  renderToString,
  renderToStaticNodeStream,
  renderToStaticMarkup
} from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import serialize from 'serialize-javascript'
import App from '../shared/App'
import Footer from '../shared/Footer'
import renderer from '../utils/renderer'
import { loadData } from '../api'
import routes from '../routes'
import template from '../utils/template'

// Specific route based cache method
const cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(favicon(path.resolve('public', 'favicon.ico')))

// Pure client side rendered page
// This bundle should live without the server as a SPA
app.get('/client', (req, res) => {
  let response = template('Client Side Rendered page')
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response)
});

// tiny trick to stop server during local development
app.get('/exit', (req, res) => {
  if(process.env.PORT) {
    res.send('Sorry, the server denies your request')
  } else {
    res.send('shutting down')
    process.exit(0)
  }
})

// Server rendered app
app.get('*', (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {}
  let baseContext = {
    locale: 'us',
    theme: 'base_theme',
    name: routes.name
  }

  let promise

  // promise = activeRoute.loadData
  //   ? activeRoute.loadData(req.path)
  //   : Promise.resolve()

  promise = (req.path !== '/' && typeof activeRoute.fetchInitialData === 'function')
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data, routes) => {
    const context = data ? { ...data, ...baseContext } : { ...baseContext }
    const FOOTER = renderToStaticMarkup(<Footer/>)
    const APP = renderToStaticNodeStream(
      <div>
        <StaticRouter 
          location={req.url} 
          context={context}
        >
          <App />
        </StaticRouter>
      </div>
    )

    if (context.status === 404) {
      res.status(404)
    }

    if (context.url) {
      return res.redirect(301, context.url)
    }

    const store = data ? serialize(data) : serialize({ ...data, ...baseContext })

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>DEMO_APP</title>
          <style>
          .fouc {
            visibility: hidden;
          }
          </style>
          ${process.env.NODE_ENV === 'production'
            ? '<link rel=\'stylesheet\' type=\'text/css\' href=\'/styles/server.css\'>'
            : ''
          }
          <script src='/bundle.js' async></script>
          <script>window.__STATE__ = ${store}</script>
        </head>
        <body class='fouc'>
          <div id='app' class='u-full-width u-full-height'>${APP}</div>
          ${FOOTER}
        </body>
      </html>
    `)
  }).catch(next)
})

app.listen(process.env.PORT || 3000, () => {
  console.log('\x1b[35m%s\x1b[0m', `Server is listening on port: 3000`)
})
