import express from 'express';

//create an express app
const app = express();

app.use(express.json());

//imports routes
import userRouter from './routes/user.route.js'


//routes declaration
app.use("/api/v1/users", userRouter);

export default app;

