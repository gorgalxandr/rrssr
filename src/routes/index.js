import Home from '../shared/Home'
import Grid from '../shared/Grid'
import Todos from '../shared/Todos'
// import TodoList from '../shared/TodoList'

// api(s)
import fetchPopularRepos from '../api'
import { loadData } from '../api'

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
    component: Todos,
    loadData: () => loadData('todos'),
    // Button name
    task: 'Task'
  }
]

export default routes
