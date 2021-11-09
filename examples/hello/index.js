import { h, app } from "hyperapp"

app({
  model: "Hello World!",
  view: model => <h1>{model}</h1>
})
