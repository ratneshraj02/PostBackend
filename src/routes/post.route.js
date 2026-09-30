import { Router } from 'express';
import {
	createPost,
	deletePost,
	getPost,
	updatePost,
} from '../controller/post.controller.js';

const router = Router();

router.post('/create', createPost);
router.patch('update/:id', updatePost);
router.get('/posts', getPost);
router.delete('/delete/:id', deletePost);

export default router;
