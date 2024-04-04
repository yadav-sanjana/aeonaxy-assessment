import express from 'express'
import { db } from "./src/config/db";
import router from './src/routes';
require('dotenv').config();
import cors from 'cors'

const app = express();
const port = process.env.PORT
app.use(express.json())
app.use(cors());
app.use('/api', router)


//route
app.get('/', (req, res) => {
    res.send('Welcome');
});

// Test database connection
async function testDBConnection() {
    try {
        db.sync({ force: false, alter: true })
        db
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

// Call the function to test the database connection
testDBConnection();

// Start the server
app.listen(port, () => {
    console.log(`running on port: ${port}`);
});

export default app
