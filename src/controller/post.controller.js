import { Post } from '../models/post.model.js';

const createPost = async (req, res) => {
	try {
		const { name, description, age } = req.body;

		if (!name || !description || !age) {
			res.status(400).json({
				message: 'All fields are required',
			});
		}

		if (!name) {
			res.status(400).json({
				message: 'name is required',
			});
		}

		if (!description) {
			res.status(400).json({
				message: 'description is required',
			});
		}

		if (!age) {
			res.status(400).json({
				message: 'age is required',
			});
		}

		const post = await Post.create({
			name,
			description,
			age,
		});

		res.status(200).json({
			message: 'message created',
			post,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Internal sever error',
			error: error,
		});
	}
};

const getPost = async (req, res) => {
	try {
		const posts = await Post.find();
		res.status(200).json({
			posts,
		});
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

const updatePost = async (req, res) => {
	try {

		if (Object.key(req.body).length == 0) {
			return res.status(400).json({
				message: '',
			});
		}

		const post = Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

		if (!post) {
			res.status(400).json({
				message : "Post not found"
			})
		}

		res.status(200).json({
			message: "Post Updated successfully",
			post,
		})
	} catch (error) {
		res.status(500).json({
			message: 'Internal server error',
			error : error.message
		});
	}
};

const deletePost = async (req, res) => {
try {
	if (Object.key(req.body).length == 0) {
		return res.status(400).json({
			message: '',
		});
	}

	console.log(req.params.id);
	console.log(req.body);

	const post = Post.findByIdAndDelete(req.params.id);

	if (!post) {
		res.status(400).json({
			message: 'Post not found',
		});
	}

	res.status(200).json({
		message: 'Post Delete successfully',
	});
} catch (error) {
	res.status(500).json({
		message: 'Internal server error',
		error: error.message,
	});
}

}


export { createPost, getPost, updatePost, deletePost };
