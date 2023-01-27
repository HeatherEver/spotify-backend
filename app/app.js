const express = require("express")
const cors = require("cors")
const querystring = require("node:querystring")
const { default: axios } = require("axios")

const app = express()

require("dotenv").config({ path: __dirname + "/../.env.development" })

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

app.use(cors())

app.get("/", (req, res, next) => {
  res.status(200).send({ msg: "hello" })
})

app.get("/login", (req, res, next) => {
  const scopes =
    "user-top-read user-read-email user-read-private user-library-read user-modify-playback-state"
  const clientId = process.env.CLIENT_ID
  const queryObj = {
    response_type: "code",
    client_id: clientId,
    redirect_uri: "http://localhost:3000/callback",
    scope: scopes,
    show_dialog: true,
  }

  res.redirect(
    "https://accounts.spotify.com/authorize?" + querystring.stringify(queryObj)
  )
})

app.get("/exchange", (req, res, next) => {
  const { code } = req.query

  axios
    .post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/callback",
      },
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(clientId + ":" + clientSecret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(({ data }) => {
      process.env.ACCESS_TOKEN = data.access_token
      console.log(data.access_token)
      res.status(200).send({
        access_token: data.access_token,
        device_id: process.env.DEVICE_ID,
      })
    })
    .catch((err) => {
      console.log(err, "<-- error")
    })
})

module.exports = { app }
