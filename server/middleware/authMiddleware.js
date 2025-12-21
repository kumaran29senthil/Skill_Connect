const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){
    const token=req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg:"Access Denied"});
    }
    
    try{
        const decoded=jwt.verify(token,'secretkey');
        req.user=decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:"Invalid Token"});
    }
};