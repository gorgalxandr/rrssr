import asyncRoute from '../shared/asyncRoute'
import fetchPopularRepos,  { loadData }  from '../api'

const home = function() {
  return {
    name: 'Home',
    path: '/',
    exact: true,
    component: asyncRoute(() => import('../shared/Home')),
    title: 'Select a language'
  }
}

const repos = function() {
  return {
    name: 'Popular Repos',
    path: '/popular/:id',
    component: asyncRoute(() => import('../shared/Grid')),
    title: `Languages`,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
}

const todos = function() {
  return {
    name: 'Todos',
    path: '/todos',
    exact: true,
    component: asyncRoute(() => import('../shared/Todos')),
    title: `Todos`,
    loadData: () => loadData('todos'),
    // Button name
    task: 'Task'
  }
}

const routes =  [
  home(),
  repos(),
  todos()
]

export default routes
