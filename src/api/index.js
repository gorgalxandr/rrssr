import fetch from 'isomorphic-fetch'

export function loadData(resourceType) {
  const encodedURI = encodeURI(`https://jsonplaceholder.typicode.com/${resourceType}`)

  return fetch(encodedURI)
    .then(res => res.json())
    // only keep 10 first results
    .then(data => data.filter((_, idx) => idx < 10))
    .catch(error => {
      console.warn(error)
      return
    })
}

export default function fetchPopularRepos(language = 'all') {
  const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  return fetch(encodedURI)
    .then(data => data.json())
    .then(repos => repos.items)
    .catch(error => {
      console.warn(error)
      return
    })
}
