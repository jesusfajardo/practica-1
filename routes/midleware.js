var JWT=require("jsonwebtoken");
var USER=require("../database/user");
var midleware=async(req,res, next)=>{
    var token=req.headers["authorization"];
    //console.log(token);
    if(token==null){
        res.status(403).json({error: "no tiee acceso a este lugar token nulo"});
        return;
    }
    var decoded =JWT.verify(token, 'PedroCabanaBautistaPotosiBolivia2020');
    console.log(decoded);
    if(decoded==null){
        res.status(403).json({error: "no tiee acceso a este lugar token falso"});
        return;
    }
    var iduser=decoded.data;
    console.log(iduser);  
    var docs =await USER.findOne({_id: iduser});
    console.log(docs);
    if(docs==null){
        res.status(403).json({error: " no tiene acceso a este lugar usuario no existe"});
        return;
    }
    var services =req.originalUrl.substr(1, 100);
    if(services.lastIndexOf("?")> -1){
        services=services.substring(0, services.lastIndexOf("?"));  
    }



    next();

}
module.exports=midleware;