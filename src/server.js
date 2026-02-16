
// server entry point
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectToDb = require('./config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectToDb();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on Port: ${PORT}`);
        })
    }catch(error) {
        console.error("Failed to start server: ", error);
        process.exit(1);
    }
}

startServer();

