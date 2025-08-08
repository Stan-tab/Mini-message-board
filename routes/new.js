import { Router, urlencoded } from "express";
import fs from "node:fs/promises";

async function getMessages() {
	try {
		return JSON.parse(await fs.readFile("./messages.json", "utf-8"));
	} catch (e) {
		console.error(e);
		throw e;
	}
}

async function writeToFileAsync(data) {
	try {
		await fs.writeFile("./messages.json", data, "utf8");
		console.log("Succes");
	} catch (err) {
		console.error("Error writing file with:", err);
	}
}

const newRouter = Router();

newRouter.get("/", (req, res) => {
	res.render("new");
});

newRouter.use(urlencoded({ extended: true }));
newRouter.post("/", async (req, res) => {
	const messages = await getMessages();
	const newMessage = req.body;
	const date = new Date();
	newMessage.date = `${date.getDate()}:${
		date.getMonth() + 1
	}:${date.getFullYear()}-${date.getHours()}H:${date.getMinutes()}m`;
	messages.push(newMessage);
	await writeToFileAsync(JSON.stringify(messages));
	res.redirect("/");
});

export default newRouter;
export { getMessages };
