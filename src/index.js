import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';

dotenv.config({
	path: './.env',
});

const startServer = async () => {
    const port = process.env.PORT || 8000;
	try {
		await connectDB();

		app.on('error', (error) => {
			console.log('Error', error);
		});

		app.listen(port, () => {
			console.log(`Server is listening ${port}`);
		});
    } catch (error) {
        console.log("MongoDB connection failed", error);
    }
};

startServer();
