import mongoose from 'mongoose';
import UserModel from '../../models/user.model';
import bcrypt from 'bcrypt';
import colors from "colors";

export const seedUsers = async () => {
    try {
        
        await UserModel.deleteMany({});

        const users = [
            {
                username: "bigdml",
                email: "iam@damolaoladipo.com",
                password: "password123",
                role: 'admin',
            },
            {
                username: 'Damola',
                email: 'dee@damolaoladipo.com',
                password: "password1234@",
                role: 'user',
            },
            {
                username: 'HelloDML',
                email: 'hello@damolaoladipo.com',
                password: "password456##",
                role: 'user',
            },
        ];

        const hashedUsers = await Promise.all(users.map(async (user) => ({
            ...user,
            password: await bcrypt.hash(user.password, 10),
        })));

        const createdUsers = await UserModel.insertMany(hashedUsers); 
        console.log(colors.blue.bold.underline(`User seed data inserted successfully`));

        return createdUsers; 

    } catch (error) {
        console.error(colors.cyan.bold.underline(`Error seeding user data: ${error}`));
        return []; 
        
    } finally {
        //await mongoose.connection.close();
    }
};
