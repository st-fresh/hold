import { h, app } from "hyperapp"

app({
  model: { x: 0, y: 0 },
  actions: {
    move: (model, { x, y }) => ({ x, y })
  },
  subscriptions: [
    (_, actions) => addEventListener("mousemove", e => actions.move({ x: e.clientX, y: e.clientY }))
  ],
  view: model => <h1><pre>{model.x}, {model.y}</pre></h1>
})
