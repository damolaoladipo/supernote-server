import seedNotes  from "./note.seed";
import { seedUsers } from "./user.seed";


const seedData = async () => {

    const createdUsers = await seedUsers();
    await seedNotes(createdUsers);
}

export default seedData;