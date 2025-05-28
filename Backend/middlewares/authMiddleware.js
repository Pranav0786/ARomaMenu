const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {  
    try {
        const authHeader = req.headers["authorization"]; 
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Invalid Token 1." });
        }
        const token = authHeader.split(" ")[1] ;
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {   
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized access",
                    success: false
                });
            } 
            req.body.id = decoded.id ; 
            next();
        })
    } catch (error) {
        res.status(400).json({ message: "Invalid Token." });
    }
};