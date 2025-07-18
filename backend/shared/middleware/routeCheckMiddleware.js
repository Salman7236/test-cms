export const routeCheckMiddleware = (req, res, next) => {
    console.log('Route Check');
    next();
}