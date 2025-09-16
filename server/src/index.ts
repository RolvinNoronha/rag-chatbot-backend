import express from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js";
import ENV from "./utils/env-variables.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", apiRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Server listening on port ${ENV.PORT}`);
});
