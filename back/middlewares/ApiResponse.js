
export default (req, res, next) =>{
    res.sendSuccess = (data, message = 'success')=>{   //attached the sendSuccess function to the res object. 
        res.status(200).json({                         //so when control goes to the router from middlware there will be sendSuccess method available.
            success: true,
            message: message,
            data: data ?? null
        });
    };

    res.sendError = (error, message = 'error', statusCode = 500) => {
        res.status(statusCode).json({
            success: false,
            message: message,
            error: error?.message || message
        });
    };

    next();
}