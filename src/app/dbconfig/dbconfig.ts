import mongoose from 'mongoose'

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected',() => {
            console.log('mongodb is successfully connected!!')
        });
        connection.on('error', (err) => {
            console.log('There is something wrong check monogdb' +err);
            process.exit();
        });

    } catch (error) {
        console.log(
            "Oops! Something went wrong"
        );
        console.log(error);
    }

}

// const connect = async () => {
//     try {
//         mongoose.connect(process.env.MONGO_URL!);
//         const connection = mongoose.connection;
//         connection.on("connected", () => {
//             console.log("mongodb is successfully connected!!");
//         });
//         connection.on("error", (err) => {
//             console.log("There is something wrong check monogdb" + err);
//             process.exit();
//         });
//     } catch (error) {
//         console.log("Oops! Something went wrong");
//         console.log(error);
//     }
// }

// export { connect };

