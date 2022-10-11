const express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
const { indexRouter } = require("./src/routes/index.routes");

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//morgan for debugging requests.
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

//set env file
let dotEnvFile;
if (process.env.NODE_ENV === "production") {
  dotEnvFile = "./.env.production";
} else {
  dotEnvFile = "./.env.development";
}

dotenv.config({
  path: dotEnvFile,
});

app.use("/", indexRouter);

app.use((error, req, res, next) => {
  //
  res.status(error.status || 400).json({ error: true, message: error.message });
});
app.listen(process.env.LISTEN_PORT, () => {
  console.log("listening on port ", process.env.LISTEN_PORT);
});
