
import jwt from 'jsonwebtoken'

<<<<<<< HEAD
function authMiddleware(req, res, next) {
    const token = req.headers['authorization']

    if (!token) { return res.status(401).json({ message: "No token provided" }) }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { return res.status(401).json({ message: "Invalid token" }) }

        req.userId = decoded.id
=======
function authMiddleWare(req,res,next){
    const token=req.headers['authorization']
    if(!token){
        return res.sendStatus(401).json({message:"Token not available"})}
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.sendStatus(401).json({message:"Invalid Token"})
        }
        req.userId=decoded.id
>>>>>>> 4bafc3e99f5c34dcdcfe09f3eec993dac9aaa90d
        next()
    })
}

export default authMiddleware


