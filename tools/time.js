import { app, h } from "hyperapp"

const humanTime = (time, miTime) => {
  const [h, m, s] = [time.getHours(), time.getMinutes(), time.getSeconds()]
  return `${miTime ?
    h : h >= 12 ? h - 12 : h}:${
    m < 10 ? `0${m}` : m}:${
    s < 10 ? `0${s}` : s} ${miTime ? "" : h >= 12 ? "PM" : "AM"}`
}

app({
  model: {
    miTime: false,
    time: new Date()
  },
  actions: {
    tick: model => ({ time: new Date() }),
    toggle: model => ({ miTime: !model.miTime })
  },
  subscriptions: [
    (_, actions) => setInterval(actions.tick, 1000),
    (_, actions) => addEventListener("click", actions.toggle)
  ],
  view: model => <h1>{humanTime(model.time, model.miTime)}</h1>
})
