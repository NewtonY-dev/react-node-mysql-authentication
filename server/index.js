import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import { connectToDatabase } from "./lib/db.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);


// test database connection
(async () => {
  try {
    await connectToDatabase();
    console.log("Test: Connection successful!");
  } catch (err) {
    console.error("Test: Connection failed!", err);
  }
})();

app.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
