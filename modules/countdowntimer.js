import { h, text, app } from "https://unpkg.com/hyperapp"
/// Utils

const pad = (n) => (n < 10 ? "0" + n : n)

const humanizeTime = (t) => {
  const hours = (t / 3600) >> 0
  const minutes = ((t - hours * 3600) / 60) >> 0
  const seconds = (t - hours * 3600 - minutes * 60) >> 0
  return `${pad(minutes)}:${pad(seconds)}`
}

/// Time Fx

const interval = (dispatch, props) => {
  const id = setInterval(() => dispatch(props.action, Date.now()), props.delay)
  return () => clearInterval(id)
}

const every = (delay, action) => [interval, { delay, action }]

/// Html

const main = (...children) => h("main", {}, children)
const title = (title) => h("h1", {}, text(title))
const button = (onclick, children) => h("button", { onclick }, text(children))

/// Main

const resetState = { count: 10 }
const countdown = (state) => ({ count: state.count - 1 })
const toggle = (state) => ({ paused: !state.paused })

const Tick = (state) =>
  state.count === 0
    ? { ...state, ...resetState, ...toggle(state) }
    : !state.paused
    ? { ...state, ...countdown(state) }
    : state

const Reset = (state) => ({ ...state, ...resetState })

const Toggle = (state) => ({ ...state, ...toggle(state) })

app({
  init: {
    ...resetState,
    paused: true,
  },
  view: (state) =>
    main(
      title(`⏱ ${humanizeTime(state.count)}`),
      button(Toggle, state.paused ? "▶️ Start" : "Pause ✋"),
      button(Reset, "Reset")
    ),
  subscriptions: () => [every(1000, Tick)],
  node: document.getElementById("timer"),
})