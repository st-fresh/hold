import {h, text, app} from "https://cdn.skypack.dev/hyperapp"

// --- KEYDOWN SUBSCRIPTION ---

const keydownSubscriber = (dispatch, options) => {
  const handler = ev => {
    if (ev.key !== options.key) return
    dispatch(options.action)
  }
  addEventListener("keydown", handler)
  return () => removeEventListener("keydown", handler)
}

const onKeyDown = (key, action) => [keydownSubscriber, {key, action}]

// --- FETCH JSON EFFECT ---

const fetchJson = (dispatch, options) => {
  fetch(options.url)
  .then(response => response.json())
  .then(data => dispatch(options.action, data))
}

const jsonFetcher = (url, action) => [fetchJson, {url, action}]

// --- ACTIONS ---

const ToggleHighlight = (state, index) => {
  let highlight = [...state.highlight]
  highlight[index] = !highlight[index]
  return { ...state, highlight}
}

const Select = (state, selected) => [
  {...state, selected},
  jsonFetcher("https://jsonplaceholder.typicode.com/users/" + state.ids[selected], GotBio),
]

const GotBio = (state, data) => ({...state, bio: data.company.bs})

const GotNames = (state, data) => ({
  ...state,
  names: data.slice(0, 5).map(x => x.name),
  ids: data.slice(0, 5).map(x => x.id),
  highlight: [false, false, false, false, false],
})

const SelectUp = state => {
  if (state.selected === null) return state
  return [Select, state.selected - 1]
}

const SelectDown = state => {
  if (state.selected === null) return state
  return [Select, state.selected + 1]
}

// --- VIEW COMPONENTS ---

const person = props =>
  h("div", {
    class: {
      person: true,
      highlight: props.highlight,
      selected: props.selected,
    },
    onclick: props.onselect,
  }, [
    h("p", {}, text(props.name)),
    h("input", {
      type: "checkbox",
      checked: props.highlight,
      onclick: (_, event) => {
        event.stopPropagation()
        return props.ontoggle
      },
    }),
  ])

// --- RUN ---

app({
  init: [
    {names: [], highlight: [], selected: null, bio: "", ids: []},
    jsonFetcher("https://jsonplaceholder.typicode.com/users", GotNames)
  ],
  view: state => h("main", {}, [
    ...state.names.map((name, index) => person({
      name,
      highlight: state.highlight[index],
      ontoggle: [ToggleHighlight, index],
      selected: state.selected === index,
      onselect: [Select, index],
    })),
    state.bio &&
    h("div", { class: "bio" }, text(state.bio)),
  ]),
  node: document.getElementById("app"),
  subscriptions: state => [

    state.selected !== null &&
    state.selected > 0 &&
    onKeyDown("ArrowUp", SelectUp),

    state.selected !== null &&
    state.selected < (state.ids.length - 1) &&
    onKeyDown("ArrowDown", SelectDown),
  ],
})