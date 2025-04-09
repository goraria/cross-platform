import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Đảm bảo biến môi trường được load

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('FATAL ERROR: MONGODB_URI is not defined in .env file');
    process.exit(1); // Thoát nếu không có URI
}

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB Connected successfully');

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected.');
        });

    } catch (error) {
        console.error('Could not connect to MongoDB:', error);
        process.exit(1); // Thoát nếu kết nối thất bại ban đầu
    }
};