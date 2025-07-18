import { Comment } from "../../models/Comment.js";

export const getOneCommentController = async (req, res) => {
    try {
        const { commentid } = req.params;

        const comment = await Comment.findById(commentid)

        if (!comment) return res.status(404).json({ error: "Comment not found" })

        res.status(200).json({ comment })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}