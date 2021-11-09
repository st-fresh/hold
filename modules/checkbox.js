import {h, text, app} from "https://cdn.skypack.dev/hyperapp"

app({
  init: { name: "Leanne Graham", highlight: true },
  view: state => h("main", {}, [
    h("div", {class: "person"}, [
      h("p", {}, text(state.name)),
      h("input", {type: "checkbox", checked: state.highlight}),
    ]),
  ]),
  node: document.getElementById("checkbox"),
})