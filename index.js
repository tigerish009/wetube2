import express from "express";
import morgan from "morgan";
const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hi from Home!!");

const handleProfile = (req, res) => res.send("You are on my profile");

const betweenHome = (req, res, next) => {
    console.log("Between");
    next();
}

app.use(betweenHome);

app.get("/", handleHome);
app.get("/profile", handleProfile);


app.listen(PORT, handleListening);