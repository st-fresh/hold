import { app, h } from "hyperapp"

const model = {
  dragging: false,
  position: {
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0
  }
}

const actions = {
  drop: model => ({ dragging: false }),
  drag: (model, { position }) => ({ dragging: true, position }),
  move: (model, { x, y }) => model.dragging
    ? ({ position: { ...model.position, x, y } })
    : model
}

const subscriptions = [
  (_, actions) => addEventListener("mouseup", actions.drop),
  (_, actions) => addEventListener("mousemove", e =>
    actions.move({ x: e.pageX, y: e.pageY }))
]

const view = (model, actions) =>
  <div
    onmousedown={e => actions.drag({
      position: {
        x: e.pageX, y: e.pageY, offsetX: e.offsetX, offsetY: e.offsetY
      }
    })}
    style={{
      position: "absolute",
      padding: "20px",
      color: "white",
      fontSize: "1.6em",
      left: model.position.x - model.position.offsetX + "px",
      top: model.position.y - model.position.offsetY + "px",
      backgroundColor: model.dragging ? "gold" : "deepskyblue",
      userSelect: "none",
      cursor: "move",
    }}
  >
    Drag Me
  </div>

app({ model, view, actions, subscriptions })