import mongoose from 'mongoose';
import { app } from './app'
const initialize = async () => {
  console.log('starting message auth q1 ')
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY is required')
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required')

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected!');
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
}
initialize();