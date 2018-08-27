let validAdmin = async function(req, res, next){ 
    if(!req.user.admin){
        return ReE(res, "You are not authorized to access this area");
    }
    next();
}
module.exports.validAdmin = validAdmin;