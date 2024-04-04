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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./src/config/db");
const routes_1 = __importDefault(require("./src/routes"));
require('dotenv').config();
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', routes_1.default);
//route
app.get('/', (req, res) => {
    res.send('Welcome');
});
// Test database connection
function testDBConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            db_1.db.sync({ force: true, alter: true });
            db_1.db
                .authenticate()
                .then(() => {
                console.log('Connection has been established successfully.');
            })
                .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        }
    });
}
// Call the function to test the database connection
testDBConnection();
// Start the server
app.listen(port, () => {
    console.log(`running on port: ${port}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map