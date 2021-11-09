import { h, app } from "hyperapp"

const Slider = ({ color, value, update }) =>
  <div>
    <input
      type="range" min="0" max="255"
      value={value}
      oninput={e => update({
        color: color,
        value: e.target.value
      })}
    />
  </div>

app({
  model: { red: 255, green: 255, blue: 255 },
  actions: {
    changeColor: (model, { color, value }) => ({ [color]: value }),
    updateBgColor: (model, data, actions) => {
      document.body.style.backgroundColor = `rgb(${model.red}, ${model.green}, ${model.blue})`
      actions.changeColor(data)
    }
  },
  view: (model, actions) =>
    <div>
      <p>Use sliders to change the background color.</p>
      {Object.keys(model).map(color =>
        <Slider
          color={color}
          value={model[color]}
          update={actions.updateBgColor}
        />)}
    </div>
})
