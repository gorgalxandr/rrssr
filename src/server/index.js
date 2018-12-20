import path from 'path'
import express from 'express'
import mcache from 'memory-cache'
import favicon from 'serve-favicon'
import cors from 'cors'
import React from 'react'
import { renderToString, renderToStaticNodeStream, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import serialize from 'serialize-javascript'
// import fetchPopularRepos from '../api'
import Footer from '../shared/Footer'
import '../styles/footer'
import App from '../shared/App'
// import Home from '../shared/Home'
// import Grid from '../shared/Grid'
// import TodoList from '../shared/TodoList'

// render engine
import renderer from '../utils/renderer'

// api(s)
import { loadData } from '../api'

// route(s)
import routes from '../routes'

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
app.get('*', (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {}
  let baseContext = {
    locale: 'us',
    theme: 'base_theme'

  }
  let promise

  // promise = activeRoute.loadData
  //   ? activeRoute.loadData(req.path)
  //   : Promise.resolve()

  promise = req.path !== '/'
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then(data => {
    const context = data ? { ...data, ...baseContext } : { ...baseContext }
    const FOOTER = renderToStaticMarkup(<Footer/>)
    const APP = renderToString(
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

    const store = data ? serialize(data) : { ...data, ...baseContext }

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          ${process.env.NODE_ENV === 'production'
            ? '<link rel=\'stylesheet\' type=\'text/css\' href=\'/styles/server.css\'>'
            : ''
          }
          <script src='/bundle.js' defer></script>
          <script>window.__INITIAL_DATA__ = ${store}</script>
          <style>
            body {
              margin: 0
            }
          </style>
        </head>
        <body class='fouc'>
          <div id='app'>${APP}</div>
          ${FOOTER}
        </body>
      </html>
    `)
  }).catch(next)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port: 3000`)
})
