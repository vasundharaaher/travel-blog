import jwt from 'jsonwebtoken';

export default (req, res, next) => {
        const authoriztion = req.headers.authorization;
        if (authoriztion) {
                const token = authoriztion.split('Bearer ')[1];
                const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

                if (decodedJWT) {
                        req.user = decodedJWT;
                        return next();
                }
        }
        res.status(401).json({
                success: false,
                msg: 'Unautherized acccess',
        });
};
