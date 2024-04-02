"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./src/config/db");
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
// Test database connection
function testDBConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.db.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        }
    });
}
// Call the function to test the database connection
testDBConnection();
// Define route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Start the server
app.listen(port, () => {
    console.log(`running on port: ${port}`);
});
//# sourceMappingURL=app.js.map