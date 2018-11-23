import Home from './Home'
import Grid from './Grid'
import TodoList from './TodoList'
import { fetchPopularRepos } from './api'
import { loadData } from './loadData'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
    title: 'A nice title'
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
