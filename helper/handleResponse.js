const error = function(statusCode,message,details){
    return {
        status : statusCode,
        message : message,
        error: {
            details:details
        }
    };
}

const success = function(statusCode,message,total,result) {
    return {
        status:statusCode,
        message:message,
        totalRecords:total,
        data:result
    }
}

module.exports = {
    error,success
}