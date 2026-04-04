// not found
export default (req, res, next) => {
        if (process.env.NODE_ENV == 'development') {
                console.log(`${req.method} - ${req.url}`);
        }
        next();
};
