const cors = require("cors");
const Configs = require("./configs/configs");
const GlobalErrorExceptions = require("./utils/globalErrorException");
const express = require("express");
const RootRouter = require("./routes/routes");
const { connectToDatabase } = require("./configs/mongodb.config");
const app = express();

connectToDatabase();

// Middleware to allow specific client origin and request methods
// cors({
//   origin: Configs.ALLOWED_ORIGINS,
//   credentials: true,
//   optionsSuccessStatus: 204,
// })
app.use(cors());
// Middleware for parsing JSON request bodies
app.use(express.json());
// Middleware for parsing URL-encoded request bodies (if needed)
app.use(express.urlencoded({ extended: true }));

// Root route
app.use("/api", RootRouter);

// landing route
app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

app.use(GlobalErrorExceptions);

app.listen(Configs.PORT || 3000, () =>
  console.log(`Server running on http://localhost:${Configs.PORT}`)
);
