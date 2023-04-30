const express = require("express");

const { PORT } = require("./config/env")

const userRoutes = require("./routes/users.routes");
const moviesRoutes = require("./routes/movies.routes");
const authenticateRoutes = require("./routes/authenticate.routes")

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(moviesRoutes);
app.use(authenticateRoutes)

app.listen(PORT, () => {
     console.log(`API Running on port ${PORT}`);
});