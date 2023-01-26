const { app } = require("./app")

app.listen(9090, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Server Listening on PORT 9090...")
  }
})
