const connectToMongo = require("./db");
const express = require("express");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
connectToMongo();
var cors = require("cors");

const app = express();
app.use(cors());
const port = 5000;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/news", require("./routes/news"));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
