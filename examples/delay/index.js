import { h, app } from "hyperapp"

app({
  model: {
    counter: 0,
    waiting: false
  },
  actions: {
    add: model => ({ counter: model.counter + 1 }),
    toggle: model => ({ waiting: !model.waiting }),
    waitThenAdd: (model, _, actions) => {
      actions.toggle()
      setTimeout(_ => {
        actions.add()
        actions.toggle()
      }, 1500)
    }
  },
  view: (model, actions) =>
    <button
      onclick={actions.waitThenAdd}
      disabled={model.waiting}
    >
      {model.counter}
    </button>
})