import { app } from "hyperapp"

const actions = {
  randomColor: _ =>
    document.body.style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16)
}

const subscriptions = [
  (_, actions) => addEventListener("mousemove", actions.randomColor)
]

app({ actions, subscriptions })
