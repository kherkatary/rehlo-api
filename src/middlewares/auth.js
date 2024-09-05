import jwt from 'jsonwebtoken';

const requireSignIn = async (req, res, next) => {
    try {
        // Extract token from authorization header
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({ message: "Authorization token required" });
        }

        // Verify token using the secret key
        const decodedData = jwt.verify(token, process.env.SUPER_SECRET_KEY);
        req.body.user = decodedData;
        next();
    } catch (err) {
        return res.status(500).send({
            message: "Error verifying token",
            error: err
        });
    }
};

export { requireSignIn };
