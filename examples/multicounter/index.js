import { h, app } from "hyperapp"

const counter = (count, add, sub) =>
  <div>
    <h1>{count}</h1>
    <button onclick={add}>+</button>
    <button onclick={sub} disabled={count <= 0}>-</button>
  </div>

const counterReduce = (model, index, reduce) =>
  model.map((item, i) => index === i ? reduce(item) : item)

app({
  model: [],
  actions: {
    create: model => model.concat(0),
    remove: model => model.slice(0, -1),
    add: (model, index) => counterReduce(model, index, count => count + 1),
    sub: (model, index) => counterReduce(model, index, count => count - 1),
  },
  view: (model, actions) =>
    <div>
      <button onclick={actions.create}>Add Counter</button>
      <button onclick={actions.remove}>Remove Counter</button>
      {model.map((item, i) => counter(item, _ => actions.add(i), _ => actions.sub(i)))}
    </div>
})