// Not a real production server :)

const html = require("hyperx")(require("hyperscript"))
const http = require("http")
const fs = require("fs")
const path = require("path")
const b = require("browserify")


const mainURL = "https://hyperapp.gomix.me/"
const logoURL = "https://cloud.githubusercontent.com/assets/56996/22876500/5777245a-f214-11e6-9bd9-b3bf51a84225.png"

const getRoutes = dir =>
  fs.readdirSync(dir).filter(file =>
    fs.statSync(path.join(dir, file)).isDirectory())

http.createServer((req, res) => {
  const routes = getRoutes(path.join(__dirname, "examples"))
  const match = req.url.match(/^\/static\/([a-z0-9_+]+)\/bundle\.js$/)

  if (req.url === "/") {
    res.write(html`
      <html>
      <head>
          <title>HyperApp Examples</title>
          <link rel="stylesheet" href="style.css"/>
          <script async defer src="https://buttons.github.io/buttons.js"></script>
      </head>
      <body>
        <div class="ha">
          <h5><a href="https://github.com/hyperapp/hyperapp">HYPERAPP</a></h5>
          <h1>Examples</h1>

          <a
            class="button button-primary"
            href="https://gomix.com/#!/project/hyperapp"
          >
            VIEW SOURCE
          </a>
          <a
            class="button"
            href="https://github.com/hyperapp/hyperapp/wiki"
          >
            DOCS
          </a>

          <p>
            <ul>
              ${routes.map(name => html`
                <li>
                  <a href="${name}">
                    ${name.toUpperCase()}
                  </a>
                </li>`)}
            </ul>
          </p>

          <small>
          <hr>
          License: <a href="https://github.com/hyperapp/hyperapp/blob/master/LICENSE">MIT</a>
          </small>

          <div class="gh-btns">
            <a class="github-button" href="https://github.com/hyperapp/hyperapp" data-icon="octicon-star" data-count-href="/hyperapp/hyperapp/stargazers" data-count-api="/repos/hyperapp/hyperapp#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star hyperapp/hyperapp on GitHub">Star</a>
            <a class="github-button" href="https://github.com/hyperapp/hyperapp/fork" data-icon="octicon-repo-forked" data-count-href="/hyperapp/hyperapp/network" data-count-api="/repos/hyperapp/hyperapp#forks_count" data-count-aria-label="# forks on GitHub" aria-label="Fork hyperapp/hyperapp on GitHub">Fork</a>
          </div>
        </div>
      </body>
      </html>`.outerHTML)
    res.end()

  } else if (req.url === "/style.css") {
    fs.createReadStream(path.join(__dirname, "style.css")).pipe(res)

  } else if (match && match.length >= 1) {
    res.setHeader("content-type", "application/javascript")

    b(`${__dirname}/examples/${match[1]}/index.js`)
      .transform("browserify-css", { autoInject: true })
      .transform("babelify", {
        presets: ["react", "latest"],
        plugins: [
          ["transform-react-jsx", {
            "pragma": "h"
          }],
          ["transform-object-rest-spread"]
        ]
      })
      .bundle().on("error", e => {
        console.error(e)
        res.writeHead(500, e.toString())
        res.end()
      }).pipe(res)

  } else {
    routes.filter(name => `/${name}` === req.url).forEach(name => {
      res.write(`
        <head>
          <link rel="stylesheet" href="style.css"/>
        </head>
        <body>
          <script src="static/${name}/bundle.js"></script>

          <a
            class="go-back button"
            href=${mainURL}
          >
            BACK TO EXAMPLES
          </a>
        </body>`)
      res.end()
    })
  }
}).listen(8080)

