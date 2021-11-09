import { h, app } from "hyperapp"

const model = { color: "" }

const view = (model, actions) =>
  <div>
    <input
      style={{
        color: model.color,
        borderColor: model.color,
        outline: "none"
      }}
      placeholder="Type a color..."
      type="text"
      oninput={e => actions.change({ color: e.target.value })}
    />
  </div>

const actions = {
  change: (model, { color }) => ({ color })
}

app({ model, view, actions })
