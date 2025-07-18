import { Comment } from '../../models/Comment.js'

export const registerCommentController = async (req, res) => {
    const data = req.body
    try {
        const comment = new Comment(data)
        await comment.save()
        return res.status(201).json({ message: `Comment saved` })
    } catch (err) {
        if (err.name === 'ValidationError') return res.status(400).json({ error : 'Fields missing' })

        res.status(500).json({ error: 'Something went wrong' })
    }
}