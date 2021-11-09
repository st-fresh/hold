import { h, app } from "hyperapp"
import "whatwg-fetch"

const URL = "https://api.github.com/orgs/fisherman/repos?per_page=100"

const model = {
  search: "",
  repos: [],
  isFetching: false,
  org: "github"
}

const view = (model, actions) =>
  <div>
    <input
      placeholder="Filter search"
      oninput={e => actions.search(e.target.value)} type="text"
    />

    <p>{model.isFetching ? "Fetching repositories..." : ""}</p>

    <ul>
      {model.repos
        .filter(({ name }) => name.substr(0, model.search.length).toLowerCase() === model.search.toLowerCase())
        .map(({ name, description, url, stars }) =>
          <li>
            <a title={description} href={url}>{name}</a>
            <span> {stars} ★</span>
          </li>)}
    </ul>
  </div>

const actions = {
  search: (model, value) => ({ search: value }),
  update: (model, { repos, isFetching }) => ({ repos: repos || [], isFetching })
}

const subscriptions = [
  (model, actions) => {
    actions.update({ isFetching: true })

    fetch(`https://api.github.com/orgs/${model.org}/repos?per_page=100`)
      .then(repos => repos.json())
      .then(repos => repos.map(repo => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count
      })))
      .then(repos => actions.update({ repos, isFetching: false }))
  }
]

app({ model, view, actions, subscriptions })

