import { h, app } from "hyperapp"

app({
  model: 0,
  actions: {
    click: model => model + 1
  },
  subscriptions: [
    (_, msg) => addEventListener("mousedown", msg.click)
  ],
  view: model => 
    <h1 
      style={{ userSelect: "none" }}
    >
      {model} clicks
    </h1>,
})

