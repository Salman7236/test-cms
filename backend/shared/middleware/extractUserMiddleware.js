export const extractUserMiddleware = (req, res, next) => {
    const userId = req.headers['x-user-id'];
    const userLevel = req.headers['x-user-level'] ? parseInt(req.headers['x-user-level'], 10) : 0;
    
    const categoryId = req.headers['x-user-category'] || null;
    
    if (!userId) return res.status(401).json({ error: 'Missing user auth data' });

    if (userLevel === 2 && !categoryId) return res.status(400).json({ error: "User Level must have category assigned" })
    
    req.user = {
        userId,
        userLevel,
        categoryId
    }
    
    next()
}