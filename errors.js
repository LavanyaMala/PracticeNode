module.exports = (err,req,res,next) =>
{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if(process.env.NODE_ENV == "development")
        res.status(err.statusCode).json(
    {
        
            success : false,
            errorMessage : err,
            errMessage : err.message,
            stack : err.stack
        
    });

    if(process.env.NODE_ENV == "production")
    {
        res.statusCode(err.statusCode).json({
            success : false,
            errMessage : err.message
        });
    }
    
}