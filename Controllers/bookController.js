const prisma =require("../database/dbConnection");

// for uploading a book
const uploadBook = async(req,res)=>{
      const {title,author,price}=req.body;
      const user_id=req.user.userId;
      const book = await prisma.books.create({
          data:{
               title:title,
               author:author,
               price:price,
               user_id:user_id
          }
      })
      res.json({
         message:"file uploaded succesfully",
         Book: book
      })
}
// for updating the entry of book
const updateBook = async(req,res)=>{
     const {book_id,title,author,price}= req.body;
     const user_id=req.user.userId;
     const book = await prisma.books.findFirst({
        where:{
            id:book_id
        }
     })
     if(!book)
         return res.json({
            message:"NO Book with given Id"  
        })

    if((book.user_id)!=user_id)
        return res.json({
            message:"This is not your book"  
        })
     const updatedBook =await prisma.books.update({
         where:{
            id:book_id    
        },
        data:{
            title:title,
            author:author,
            price:price
        }
     })
    return res.json({
        message:"book updated successfully",
        updatedBook
    })
}
// for deleting the entry of a book
const deleteBook = async(req,res)=>{
    const {book_id}= req.body;
    const user_id=req.user.userId;
    const book = await prisma.books.findFirst({
       where:{
           id:book_id
       }
    })
    if(!book)
        {
            return res.json({
                message:"No book with this id"  
            })
        }
    if((book.user_id)!=user_id)
        return res.json({
            message:"This is not your book"  
        })
    const deleteBook = await prisma.books.delete({
        where:{
            id:book_id
        }
    })
    res.json({
        message:"book deleted successfully"
    })
}
// for seller->getting all it's books
const getSellerBook = async(req,res)=>{
    const user_id=req.user.userId;
    const allBooks = await prisma.books.findMany({
        where:{
            user_id:user_id
        }
    })
    res.json({
         message:"all books fetched",
         allBooks:allBooks
    })
}
// for user->getting all books
const getAllBooks=async(req,res)=>{
    const allBooks = await prisma.books.findMany({
    })
    res.json({
         message:"all books fetched",
         allBooks:allBooks
    })
}
// for viewing a particular book
const viewBook = async(req,res)=>{
      const {book_id}= req.body;
      const book = await prisma.books.findFirst({
        where:{
            id:book_id
        }
    })
    res.json({
         message:" book detail fetched",
         Book:book
    })
}
module.exports= {uploadBook,updateBook,deleteBook,getSellerBook,getAllBooks,viewBook};