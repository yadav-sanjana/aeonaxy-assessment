"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const cloudImage_1 = require("../config/cloudImage");
const courseController_1 = require("../controllers/courseController");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send({
        message: "all api routes"
    });
});
//users routes
router.get('/user', userController_1.UserController.getUsers);
router.get('/user/:id', userController_1.UserController.getUserByID);
router.post('/user', cloudImage_1.upload.single('profile_pic'), userController_1.UserController.registerUser);
router.patch('/user/:id', cloudImage_1.upload.single('profile_pic'), userController_1.UserController.updateUser);
router.put('/user/:id', userController_1.UserController.changeUserStatus);
//course Routes
router.get('/course', courseController_1.CourseController.fetchCourseList);
router.get('/course/:id', courseController_1.CourseController.fetchCourseByID);
exports.default = router;
//# sourceMappingURL=index.js.map