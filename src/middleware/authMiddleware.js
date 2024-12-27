import jwt from 'jsonwebtoken'

function authMiddleWare(req,res,next){
    const token=req.headers['authorization']
    if(!token){
        return res.sendStatus(401).json({message:"Token not available"})}
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.sendStatus(401).json({message:"Invalid Token"})
        }
        req.userId=decoded.id
        next()
    })
}
export default authMiddleWare