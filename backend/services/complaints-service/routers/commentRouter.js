import { Router } from 'express';

import { getAllCommentController } from '../controllers/commentControllers/getAllCommentController.js';
import { registerCommentController } from '../controllers/commentControllers/registerCommentController.js';
import { deleteCommentController } from '../controllers/commentControllers/deleteCommentController.js';
import { getOneCommentController } from '../controllers/CommentControllers/getOneCommentController.js';
import { patchCommentController } from '../controllers/commentControllers/patchCommentController.js';

export const commentRouter = Router({ mergeParams: true });

commentRouter.get('/', getAllCommentController)
commentRouter.post('/register', registerCommentController)
commentRouter.get('/:commentid', getOneCommentController)
commentRouter.patch('/:commentid', patchCommentController)
commentRouter.delete('/:commentid', deleteCommentController)