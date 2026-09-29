import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
	const dbUrl = process.env.MONGODB_URL;
	try {
		const connectionInstance = await mongoose.connect(`${dbUrl}`);
		console.log(`\n db connected!!! ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed :", error);
        process.exit(1);
    }
};

export default connectDB;
