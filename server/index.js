const express = require("express")
const consola = require("consola")
const { Nuxt, Builder } = require("nuxt")
const app = express()
const bodyParser = require("body-parser")
const session = require("express-session")
const compression = require("compression")
const mongoSessionStore = require("connect-mongo")
const mongoose = require("mongoose")
const helmet = require("helmet")
const api = require("./api")

const host = process.env.HOST || "127.0.0.1"
const port = process.env.PORT || 3000
const auconfig = require("../config/auth.js")
app.set("port", port)

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js")
config.dev = !(process.env.NODE_ENV === "production")

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}
const MONGO_URL =
  "mongodb://" +
  auconfig.dbuser +
  ":" +
  auconfig.dbpassword +
  "@127.0.0.1/" +
  auconfig.db
mongoose.connect(
  MONGO_URL,
  options
)
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)
  app.use(bodyParser.json())
  app.use(helmet())
  app.use(compression())
  const MongoStore = mongoSessionStore(session)
  app.use(
    session({
      secret: "super-secret-kkkk",
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 14 * 24 * 60 * 60 //14 days
      }),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 14 * 24 * 60 * 60 }
    })
  )
  api(app)
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
