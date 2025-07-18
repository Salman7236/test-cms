import { Comment } from "../../models/Comment.js";

export const deleteCommentController = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(id)

        if (!comment) return res.status(404).json({ error: "Comment not found" })

        return res.status(200).json({ message: `Comment deleted` })
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}