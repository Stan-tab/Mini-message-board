import express from "express";
import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
dotenv.config({ path: "./main.env" });
const __dirname = import.meta.dirname;

const app = express();
const PORT = process.env.PORT || 8000;
let messages = await fs.readFile("./messages.json", "utf-8");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



app.listen(PORT, () => {
	console.log(`Listen on localhost:${PORT}`);
});
