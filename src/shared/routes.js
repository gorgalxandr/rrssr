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
    // test: 'test'
  }
]

export default routes

// const routes = [{
//   path: '/',
//   exact: true,
//   component: Home,
//   // title: 'The title'
// },
// {
//   path: '/todos',
//   component: TodoList,
//   // loadData: () => loadData('todos'),
//   // test: 'test'
// },
// {
//   path: '/popular/:id',
//   component: Grid,
//   fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
// }]
