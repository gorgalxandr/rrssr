import express from 'express'
import cors from 'cors'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import serialize from 'serialize-javascript'
import App from '../shared/App'
import Home from '../shared/Home'
import Grid from '../shared/Grid'
// import NotFound from './NotFound'
import TodoList from '../shared/TodoList'
import { fetchPopularRepos } from '../shared/api'
import loadData from '../shared/loadData'
import routes from '../shared/routes'

const app = express()

app.use(cors())
app.use(express.static('public'))

app.get('*', (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {}
  let promise

  promise = activeRoute.loadData
    ? activeRoute.loadData(req.path)
    : Promise.resolve()

  promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then(data => {
    const context = { data }
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
          <link rel='stylesheet' type='text/css' href='/styles/server.css'>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${HTML}</div>
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

/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/