const prisma =require("../database/dbConnection");

// for parsing csv
function parsingCsv(req) {
    return new Promise((resolve, reject) => {
      /** @type {any[]} */
      const chunks = [];
      req.on('data', (data) => {
        chunks.push(data);
      });
      req.on('end', () => {
        const payload = Buffer.concat(chunks).toString()
        resolve(payload);
      });
      req.on('error', reject);
    });
  }
// for csv to json
const csvTojson = async(req,user_id)=>{
   const csv=await parsingCsv(req)
   const temp = csv.split('\n')
   const lines= temp.slice(4,temp.length-6)
   const result = []
   const headers = lines[0].split(',')

for (let i = 1; i < lines.length; i++) {        
    if (!lines[i])
        continue
    const obj = {}
    const currentline = lines[i].split(',')

    for (let j = 0; j < headers.length; j++) {
        if(j==(headers.length-1))
        {
              const key= headers[j].slice(0,-1);
              const value = currentline[j].slice(0,-1);
              obj[key] = parseFloat(value)
        }
        else
        obj[headers[j]] = currentline[j]
    
    }
    obj["user_id"]= parseInt(user_id)
    result.push(obj)
}
    return result;
}
// for uploading a book
const uploadBook = async(req,res)=>{
    const user_id=req.user.userId;
      const jsonfile=await csvTojson(req,user_id);
    //   const {title,author,publishedDate,price}=req.body;
      console.log(jsonfile)
      const book = await prisma.books.createMany({
        data:jsonfile
      })
      res.json({
         message:"file uploaded succesfully",
         Book: ""
      })
}

// for updating the entry of book
const updateBook = async(req,res)=>{
     const {book_id,title,author,price,publishedDate}= req.body;
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
            price:price,
            publishedDate:publishedDate
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