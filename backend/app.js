const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connect = require("./db/db.connect");
const userRoutes = require("./routes/user.routes");

const app = express();

connect();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
});

app.use("/users", userRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on " + PORT);
})