import { Router } from 'express';
import { allPost, getPost, newPost, editPost, deletePost } from '../controllers/postController.js';

const postRouter = Router();

postRouter.get('/all-post', allPost);
postRouter.post('/new-post', newPost);
postRouter.get('/get-post', getPost);
postRouter.put('/edit-post', editPost);
postRouter.delete('/delete-post', deletePost);

export default postRouter;
