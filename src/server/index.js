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
import routes from '../routes'
import template from '../utils/template'
import render from '../utils/renderer'
import { loadData } from '../api'

// Specific route based cache method
const cache = duration => {
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
const footer = renderToStaticMarkup(<Footer/>)

app.use(cors())
app.use(express.static('public'))
app.use(favicon(path.resolve('public', 'favicon.ico')))

// Pure client side rendered page
// This bundle should live without the server as a SPA
app.get('/client', (req, res) => {
  let response = template('Client Side Rendered page', {}, 'Hello')
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
app.get('/popular/:id', (req, res, next) => {
  // necressary for server-side render to avoid undefined
  let staticContext = {}

  const activeRoute = routes.find(route => matchPath(req.url, route)) || {}
  const repos_context = {
    locale: 'us',
    theme: 'repos_theme',
    name: 'Popular Repos'
  }

  const promise = (req.path !== '/' && typeof activeRoute.fetchInitialData === 'function')
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then(data => {
    const context = data ? { ...data, ...staticContext } : { ...staticContext }
    const state = data ? serialize(data) : serialize({ ...data, ...repos_context })

    console.log('[ context, state ]', context, state)
    
    const app = renderToStaticNodeStream(
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

    res.setHeader('Cache-Control', 'assets, max-age=0')
    res.status(context.statusCode || 200)
    .send(`
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
        </head>
        <body class='fouc'>
          <div id='app' class='u-full-width u-full-height'>${app}</div>
          ${footer}
          <script src='/bundle.js' async></script>
          <script>window.__STATE__ = ${state}</script>
        </body>
      </html>
    `)
  }).catch(next)
})

app.get('/', (req, res, next) => {
  // necressary for server-side render to avoid undefined
  let staticContext = {}

  const homeState = {
    locale: 'us',
    theme: 'home_theme',
  }

  const promise = (req.path === '/')
    ? Promise.resolve()
    : Promise.reject()

  promise.then(() => {
    const context = { ...staticContext }
    const state = serialize({ ...homeState })

    console.log('[ context, state ]', context, state)

    const app = renderToStaticNodeStream(
      <React.Fragment>
        <StaticRouter 
          location={req.url} 
          context={context}
        >
          <App />
        </StaticRouter>
      </React.Fragment>
    )

    const html = render('Home', state, app, footer)

    if (context.status === 404) {
      res.status(404)
    }

    if (context.url) {
      res.redirect(301, context.url)
    }

    res.setHeader('Cache-Control', 'assets, max-age=0')
    res.status(context.statusCode || 200)
    .send(html)
  }).catch(next)
})

app.listen(process.env.PORT || 3000, () => {
  console.log('\x1b[35m%s\x1b[0m', `Server is running at http://localhost:${process.env.PORT || 3000}`)
})
