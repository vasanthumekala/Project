import dotenv from "dotenv";
import { app } from "./app.js";

import connectDB from "./db/connect.js";
dotenv.config({
  path: "./.env",
});
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 6000, () => {
      console.log(`server is running on port : ${process.env.PORT || 6000}`);
    });
  })
  .catch((err) => {
    console.log("Database Connection Failed ", err);
  });
