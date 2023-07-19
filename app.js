const express = require("express");
const app = express();
const routes = require("./routes/routes");
const dotenv = require("dotenv");
const sequelize = require("./db");
const { Protect } = require("./utils/Protect"); // Add this line to include the Protect middleware

// Load env vars
dotenv.config({ path: "./config/config.env" });

/************** Middlewares ****************/
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(Protect); // Use the Protect middleware to verify user token and extract user information

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Welcome");
});

// Connect to the database
const startServer = async () => {
  try {
    await sequelize.sync();
    const PORT = process.env.PORT || 5050;
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

startServer();
