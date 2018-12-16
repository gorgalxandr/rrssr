import asyncRoute from '../shared/asyncRoute'

// import Home from '../shared/Home'
const Home = asyncRoute(() => import('../shared/Home'))
// import Grid from '../shared/Grid'
const Grid = asyncRoute(() => import('../shared/Grid'))
// import Todos from '../shared/Todos'
const Todos = asyncRoute(() => import('../shared/Todos'))
// import TodoList from '../shared/TodoList'

// api(s)
import fetchPopularRepos,  { loadData }  from '../api'
// import { loadData } from '../api'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
    title: 'Select a language'
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  },
  {
    path: '/todos',
    exact: true,
    component: Todos,
    loadData: () => loadData('todos'),
    // Button name
    task: 'Task'
  }
]

export default routes
