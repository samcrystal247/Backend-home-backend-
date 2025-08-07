const express = require("express");

// import express from "express";
const dotenv = require("dotenv").config();
const App = express();
const bodyParser = require("body-parser");
const UserRoutes = require("./routes/UserRoute.js");
const cors = require("cors");

const PORT = process.env.PORT;
const taskRoutes = require("./routes/Task.js");

const colors = require("colors");
const connectDB = require("./config/db");
connectDB();
App.use(bodyParser.json());
App.use(cors());
App.use("/Task", taskRoutes);
App.use("/api/Users", UserRoutes);

App.get("/find", (request, response) => {
  const people = [
    {
      id: 1,
      fistName: "sam",
      lastName: "nnamazu",
      isAdmin: True,
      isComplete: True,
    },
    {
      id: 2,
      fistName: "john",
      lastName: "Okon",
      isAdmin: false,
      isComplete: True,
    },
    {
      id: 3,
      fistName: "okey onu",
      lastName: "Uka",
      isAdmin: True,
      isComplete: false,
    },
  ];

  response.status(405).json({ message: "successful", people });
});

App.listen(PORT, () => console.log(`App running on PORT ${PORT}`));
