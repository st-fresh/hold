import { app, h } from "hyperapp"

const FilterInfo = { All: 0, Todo: 1, Done: 2 }

app({
  model: {
    todos: [],
    filter: FilterInfo.All,
    input: "",
    placeholder: "Add new todo!",
    selection: 0
  },
  view: (model, actions) =>
    <div>
      <h1>Todo</h1>
      <p>
        Show: {Object.keys(FilterInfo)
          .filter(key => FilterInfo[key] !== model.filter)
          .map(key =>
            <span>
              <a
                href="#"
                onclick={_ => actions.filter({
                  value: FilterInfo[key]
                })}
              >{key}</a>
            </span>
          )}
      </p>

      <p>
        <ul>
          {model.todos
            .filter(t =>
              model.filter === FilterInfo.Done
                ? t.done :
              model.filter === FilterInfo.Todo
                ? !t.done :
              model.filter === FilterInfo.All)
            .map(t =>
              <li style={{
                color: t.done ? "gray" : "black",
                textDecoration: t.done ? "line-through" : "none"
              }}
                onclick={e => actions.toggle({
                  value: t.done,
                  id: t.id
                })}
              >
                {t.value}
              </li>)}
        </ul>
      </p>

      <p>
        <input
          type="text"
          onkeyup={e => e.keyCode === 13 ? actions.add() : ""}
          oninput={e => actions.input({ value: e.target.value })}
          value={model.input}
          selectionEnd={model.selection}
          placeholder={model.placeholder}
        />{" "}
        <button onclick={actions.add}>add</button>
      </p>
    </div>,
  actions: {
    add: model => ({
      input: "",
      todos: model.todos.concat({
        done: false,
        value: model.input,
        id: model.todos.length + 1
      })
    }),
    toggle: (model, { id, value }) => ({
      todos: model.todos.map(t =>
        id === t.id
          ? Object.assign({}, t, { done: !value })
          : t)
    }),
    input: (model, { value }) => ({ input: value }),
    filter: (model, { value }) => ({ filter: value })
  }
})