import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'
import cors from 'cors'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import serialize from 'serialize-javascript'
import App from '../shared/App'
import Home from '../shared/Home'
import Grid from '../shared/Grid'
import TodoList from '../shared/TodoList'
import fetchPopularRepos from '../api'

// api(s)
import { loadData } from '../api'

// route(s)
import routes from '../routes'

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(favicon(path.resolve('public', 'favicon.ico')))
app.get('*', (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {}
  let promise

  // promise = activeRoute.loadData
  //   ? activeRoute.loadData(req.path)
  //   : Promise.resolve()

  promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  // console.log(typeof promise)
  // console.log(promise)
  console.log(req.path)

  promise.then(data => {
    const context = { data }
    console.log('[ context ]', context)
    const HTML = renderToString(
      <StaticRouter 
        location={req.url} 
        context={context}
      >
        <App />
      </StaticRouter>
    )

    if (context.status === 404) {
      res.status(404)
    }

    if (context.url) {
      return res.redirect(301, context.url)
    }

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
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id='app' class='fouc wrap'>${HTML}</div>
        </body>

        <script>
          console.log('[ DATA: APP_STORE ]', ${serialize(data)});
        </script>
      </html>
    `)
  }).catch(next)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port: 3000`)
})
