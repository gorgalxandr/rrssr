import asyncRoute from '../shared/asyncRoute'

// import Home from '../shared/Home'
// const Home = asyncRoute(() => import('../shared/Home'))
// import Grid from '../shared/Grid'
// const Grid = asyncRoute(() => import('../shared/Grid'))
// import Todos from '../shared/Todos'
// const Todos = asyncRoute(() => import('../shared/Todos'))
// import TodoList from '../shared/TodoList'

// api(s)
import fetchPopularRepos,  { loadData }  from '../api'
// import { loadData } from '../api'

const routes =  [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: asyncRoute(() => import('../shared/Home')),
    title: 'Select a language'
  },
  {
    name: 'Popular Repos',
    path: '/popular/:id',
    component: asyncRoute(() => import('../shared/Grid')),
    title: `Languages`,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  },
  {
    name: 'Todos',
    path: '/todos',
    exact: true,
    component: asyncRoute(() => import('../shared/Todos')),
    title: `Todos`,
    loadData: () => loadData('todos'),
    // Button name
    task: 'Task'
  }
]

export default routes
