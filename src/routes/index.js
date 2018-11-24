import Home from '../shared/Home'
import Grid from '../shared/Grid'
import TodoList from '../shared/TodoList'
import { fetchPopularRepos } from '../shared/api'
import { loadData } from '../shared/loadData'

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
    component: TodoList,
    // loadData: () => loadData('todos'),
    task: 'Task' // name for button
  }
]

export default routes
