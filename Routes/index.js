const Router =require("express")
const router=Router();
const userRoutes= require("./userRoutes");
const bookRoutes = require("./bookRoutes");
router.use("/api/user",userRoutes);
router.use("/api/books",bookRoutes);
module.exports= router;