const Router = require("express");
const  {register,login, updateUser}  = require("../Controllers/userController");
const {uploadBook,deleteBook,updateBook,getAllBooks,getSellerBook,viewBook} = require("../Controllers/bookController");
const {Authorize,isSeller,isBuyer}= require("../middlewares/Auth");

const router=Router();
router.post("/upload",Authorize,isSeller,uploadBook);
router.delete("/delete",Authorize,isSeller,deleteBook);
router.put("/update",Authorize,isSeller,updateBook);
router.get("/getSellerBooks",Authorize,isSeller,getSellerBook);
router.get("/getAllBooks",Authorize,isBuyer,getAllBooks);
router.get("/viewBook",Authorize,isBuyer,viewBook);
module.exports=router;