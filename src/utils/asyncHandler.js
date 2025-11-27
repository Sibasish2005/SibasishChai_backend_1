const asyncHandler = (requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>{
            next(err)
        })
    }
}
// try catch wala:

// const asyncHandler = (fn)=> async (req,res,next)=>{
//     try {
//         await fn(req,req,res)
//     } catch (error) {
//         res.status(error.code||500).json({
//             succes:false,
//             error:error.message
//         })
//     }
// }

export {asyncHandler}