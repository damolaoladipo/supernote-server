import mongoose, { ObjectId } from 'mongoose';
import NoteModel from '../../models/note.model';
import colors from "colors";

const seedNotes = async (createdUsers: Array<{ _id: ObjectId }>) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string,);

        
        await NoteModel.deleteMany({});
        
         const notes = [
            {
                title: "Design System Principles",
                content: "A design system is a collection of reusable components guided by clear standards. It allows for consistency in design and provides a common language for designers and developers.",
                author: "Oluwatobi immanuel",
                tags: ["Product Designer", "Design System", "UI/UX"],
                userId: createdUsers[2]._id,
            },
            {
                title: "Building Scalable Applications",
                content: "When building scalable applications, consider using microservices architecture, cloud services, and containerization to ensure smooth performance and easy maintenance.",
                author: "Buchi Lazarus",
                tags: ["Software Engineer", "Architecture", "Scalability"],
                userId: createdUsers[1]._id,
            },
            {
                title: "Data Science Lifecycle",
                content: "The data science lifecycle includes problem definition, data collection, data cleaning, exploratory data analysis, modeling, and deployment.",
                author: "Chinenye Jessica",
                tags: ["Data Scientist", "Machine Learning", "Data Analysis"],
                userId: createdUsers[0]._id, 
            },
            {
                title: "Effective Product Management",
                content: "An effective product manager should communicate well, understand the market needs, and prioritize features based on user feedback and business goals.",
                author: "Damola Oladipo",
                tags: ["Product Manager", "Agile", "User Research"],
                userId: createdUsers[0]._id,
            },
            {
                title: "JavaScript Best Practices",
                content: "Use ES6 features like arrow functions, destructuring, and template literals for cleaner and more efficient JavaScript code. Always write unit tests for your functions.",
                author: "Austin Tochukwu",
                tags: ["Software Engineer", "JavaScript", "Best Practices"],
                userId: createdUsers[0]._id,
            },
            {
                title: "The Importance of Prototyping",
                content: "Prototyping helps visualize ideas and test assumptions before full-scale development. Use tools like Figma or Adobe XD for creating interactive prototypes.",
                author: "Damola",
                tags: ["Product Designer", "Prototyping", "UX"],
                userId: createdUsers[0]._id,
            }
        ];

        await NoteModel.insertMany(notes);

        console.log(colors.magenta.bold.underline(`Note seed data inserted successfully`));
    } catch (error) {
        console.error(colors.cyan.bold.underline(`Error seeding note data: ${error}`));
    } finally {
        //await mongoose.connection.close();
    }
};

export default seedNotes;