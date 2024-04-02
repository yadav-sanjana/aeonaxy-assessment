import { db } from "./src/config/db";
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT


// Test database connection
async function testDBConnection() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

// Call the function to test the database connection
testDBConnection();

// Define route
app.get('/', (req: any, res: any) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`running on port: ${port}`);
});
