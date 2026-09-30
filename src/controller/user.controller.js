import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		//basic validation
		if (!username || !email || !password) {
			return res.status(400).json({
				message: 'All fields are required',
				user: { id: user._id, email: user.email, username: user.username },
			});
		}

		//check if the user exist already
		const existing = await User.findOne({ email: email.toLowerCase() });
		if (existing) {
			res.status(400).json({
				massage: 'User already exist',
			});
		}

		//create user
		const user = await User.create({
			username,
			email: email.toLowerCase(),
			password,
			loggedIn: false,
		});

		res.status(201).json({ message: 'User registered', user });
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Internal server error', error: error.message });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		//validation
		if (!email) {
			return res.status(400).json({ message: 'email is required' });
		}

		if (!password) {
			return res.status(400).json({ message: 'password is required' });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: 'password must be 6 or more character' });
		}

		const user = await User.findOne({
			email: email,
		});

		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		//to complete the password
		const isMatch = await user.comparePassword(password);

		if (!isMatch) {
			return res.status(400).json({
				message: 'Invalid credential',
			});
		}

		res.status(200).json({
			message: 'User logged In',
			user: {
				id: user._id,
				email: user.email,
				username: user.username,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: 'Internal sever error',
		});
	}
};

const logoutUser = async (req, res) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({
			email : email
		})

		if (!user) {
			return res.status(400).json({
				message: "User not found"
			});
		}

		res.status(200).json({
			message: "Logout successfully"
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error : error.message
		})
	}
};
export { registerUser, loginUser, logoutUser };
