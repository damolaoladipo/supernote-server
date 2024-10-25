import mongoose from 'mongoose';
import UserModel from '../../models/user.model'; 
import bcrypt from 'bcrypt';

export const seedUsers = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI as string, {
        });


        await UserModel.deleteMany({});


        const users = [
            {
                username: "bigdml",
                email: "iam@damolaoladipo.com",
                password: "password123",
            },
            {
                username: 'Damola',
                email: 'dee@damolaoladipo.com',
                password: "password123",
            },
            {
                username: 'HelloDML',
                email: 'hello@damolaoladipo.com',
                password: "password456",
            },

        ];

        const hashedUsers = await Promise.all(users.map(async (user) => ({
            ...user,
            password: await bcrypt.hash(user.password, 10),
        })));

        await UserModel.insertMany(hashedUsers);

        console.log('User seed data inserted successfully');
    } catch (error) {
        console.error('Error seeding user data:', error);
    } finally {
        
        await mongoose.connection.close();
    }
};


seedUsers();
