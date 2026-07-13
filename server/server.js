const express = require("express");
const dotenv = require("dotenv");
const route = require("./routes/routes");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

dotenv.config();

const connectToDB = async () => {
  try {
    await connectDB().then(
      app.listen(process.env.PORT, () => {
        console.log(`Server is running at http:/localhost:${process.env.PORT}`);
      }),
    );
  } catch (err) {
    console.log("Error in starting sever : " + err);
  }
};

connectToDB();

app.use("/api", route);
