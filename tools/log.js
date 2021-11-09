import { h, app } from "hyperapp"

app({
  model: true,
  actions: {
    toggle: model => !model,
    fail: (model, actions, data, err) =>
      setTimeout(_ => err("Abort, Retry, Fail!"), 1000)
  },
  hooks: {
    onError: error => console.log(`Error: ${error}`),
    onAction: (action) => console.log(`Action: ${action}`)
  },
  view: (model, actions) =>
    <div>
      <button onclick={actions.toggle}>
        Log
      </button>
      <button onclick={actions.fail}>
        Error
      </button>
    </div>
})
