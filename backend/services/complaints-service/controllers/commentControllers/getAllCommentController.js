import { Comment } from "../../models/Comment.js"

export const getAllCommentController = async (req, res) => {
    try {
        const { compid } = req.params;
        
        const comments = await Comment.find({
            complaintId: compid
        })

        return res.status(200).json({ comments })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}