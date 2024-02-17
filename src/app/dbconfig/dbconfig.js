import mongoose from "mongoose";

// export async function connect() {
//     try {
//         const { connection } = await mongoose.connect(process.env.MONGO_URI, {
//             dbName: "newUser21",
//         });
//         console.log("Db connected ---------------");
//     } catch (error) {
//         console.log(error);
//     }
// }

export async function connect() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MongoDB URI not defined in environment variables");
        }

        await mongoose.connect(process.env.MONGODB_URI);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB is successfully connected!!');
        });

        connection.on('error', (err) => {
            console.error('Error connecting to MongoDB:', err);
        });

    } catch (error) {
        console.error("Oops! Something went wrong during MongoDB connection:");
        console.log(error);
    }
}
