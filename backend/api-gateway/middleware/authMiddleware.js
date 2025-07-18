export const authMiddleware = (req, res, next) => {
    if (!req.session.user) return res.status(401).json({ error: 'Unauthenticated' })
    
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

    const tokens = [
        'token',
        'jwt',
    ]

    if (!tokens.includes(token)) return res.status(401).json({ error: 'Unauthorized: Token not recognised' })
    console.log('Authenticated request');

    next()
}