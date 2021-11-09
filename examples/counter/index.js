import { h, app } from "hyperapp"

app({
  model: 0,
  actions: {
    add: model => model + 1,
    sub: model => model - 1
  },
  view: (model, msg) =>
    <div>
      <h1>{model}</h1>
      <button onclick={msg.add}>+</button>
      <button onclick={msg.sub} disabled={model <= 0}>-</button>
    </div>,
})
