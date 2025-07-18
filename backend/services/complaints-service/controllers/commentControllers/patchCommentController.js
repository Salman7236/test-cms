import { Comment } from "../../models/Comment.js";

export const patchCommentController = async (req, res) => {
    const { commentid } = req.params
    const data = req.body
    try {
        const comment = await Comment.findOneAndUpdate(
            { _id: commentid }, 
            { $set: data }, 
            { new: true, runValidators: true }
        )

        if (!comment) return res.status(404).json({ error: "Comment not found" })

        res.status(200).json({ message: "Data Updated" })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}