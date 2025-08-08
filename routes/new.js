import { Router, urlencoded } from "express";

const newRouter = Router();

newRouter.get("/", (req, res) => {
	res.render("new");
});

newRouter.use(urlencoded({extended: true}))
newRouter.post("/", (req, res) => {
    console.log(req.body)
    res.redirect("/")
})

export default newRouter;
