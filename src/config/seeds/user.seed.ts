import mongoose from 'mongoose';
import UserModel from '../../models/user.model'; 
import bcrypt from 'bcrypt';
import colors from "colors";

export const seedUsers = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI as string, {
            // useNewUrlParser: true, useUnifiedTopology: true
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
                password: "password1234@",
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

        console.log( colors.blue.bold.underline(`User seed data inserted successfully`));
    } catch (error) {
        console.error(colors.cyan.bold.underline(`Error seeding user data: ${error}`));
    } finally {
        
        //await mongoose.connection.close();
    }
};


seedUsers();
