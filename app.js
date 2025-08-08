import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import newRouter from "./routes/new.js";
import { getMessages } from "./routes/new.js";
dotenv.config({ path: "./main.env" });
const __dirname = import.meta.dirname;

const app = express();
const PORT = process.env.PORT || 8000;
const assetsPath = path.join(__dirname, "public");
let messages = await getMessages();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));

app.get("/", async (req, res) => {
	messages = await getMessages();
	res.render("index", { messages });
});

app.use("/new", newRouter);

app.listen(PORT, () => {
	console.log(`Listen on localhost:${PORT}`);
});
