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
exports.UserEnrollment = exports.UserController = void 0;
const UserCourseModel_1 = require("../models/UserCourseModel");
const UserModel_1 = require("../models/UserModel");
const cloudinary_1 = require("cloudinary");
const auth_1 = __importDefault(require("../middlewares/auth"));
const CourseModel_1 = require("../models/CourseModel");
const notificationFunctions_1 = require("../utils/notificationFunctions");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
exports.UserController = {
    //get user details by user id
    getUserByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const user = yield UserModel_1.UserModel.findOne({
                    where: {
                        id
                    }
                });
                if (!user) {
                    res.status(404).send({
                        message: "User not Found"
                    });
                }
                res.send(user);
            }
            catch (error) {
                res.status(500).send({
                    error: 'Internal server error'
                });
            }
        });
    },
    //get user by token (JWT) login system
    userByToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.sqlUID;
            const userDetail = yield UserModel_1.UserModel.findOne({
                where: {
                    id
                }
            });
            if (!userDetail) {
                return res.status(404).send({
                    error: "User not Exists"
                });
            }
            res.status(200).send(userDetail);
        });
    },
    //generating jwt token for backend purpose
    getUserToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.params.email;
            try {
                const exist = yield UserModel_1.UserModel.findOne({
                    where: {
                        email
                    }
                });
                if (!exist) {
                    return res.status(404).send({
                        message: "User not found"
                    });
                }
                const token = (0, auth_1.default)(exist === null || exist === void 0 ? void 0 : exist.get("id"), exist === null || exist === void 0 ? void 0 : exist.get("email"));
                res.send({
                    user: exist,
                    token: token
                });
            }
            catch (error) {
                console.log(error, "error occured");
                res.status(500).send({
                    error: "Something went wrong"
                });
            }
        });
    },
    // get user lists
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userList = yield UserModel_1.UserModel.findAll({});
                res.send(userList);
            }
            catch (error) {
                res.status(500).send({
                    error: 'Internal server error'
                });
            }
        });
    },
    // create/register a new user
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                let imageUrl = " ";
                if (!emailRegex.test(email)) {
                    return res.status(400).send({
                        error: 'Invalid email format'
                    });
                }
                if (!passwordRegex.test(password)) {
                    return res.status(400).send({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number' });
                }
                // Upload image to Cloudinary if file exists
                if (req.file && req.file.buffer) {
                    yield new Promise((resolve, reject) => {
                        cloudinary_1.v2.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => __awaiter(this, void 0, void 0, function* () {
                            if (error) {
                                console.error('Error uploading to Cloudinary:', error);
                                reject(error);
                                return;
                            }
                            console.log(result === null || result === void 0 ? void 0 : result.url, "result within this result");
                            imageUrl = (result === null || result === void 0 ? void 0 : result.url) || "";
                            resolve();
                        })).end(req.file.buffer);
                    });
                }
                // Check if the email is already registered
                const existingUser = yield UserModel_1.UserModel.findOne({
                    where: {
                        email
                    }
                });
                if (existingUser) {
                    return res.status(400).send({
                        error: 'Email is already registered'
                    });
                }
                // Create new user
                const newUser = yield UserModel_1.UserModel.create({
                    name,
                    email,
                    password,
                    profile_pic: imageUrl
                });
                (0, notificationFunctions_1.sendRegistered)(email, name);
                res.status(201).send(newUser);
            }
            catch (error) {
                console.error('Error registering user:', error);
                res.status(500).send({
                    error: 'Internal server error'
                });
            }
        });
    },
    //update existing user
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id || req.sqlUID;
                const { name, password } = req.body;
                let imageUrl = '';
                if (!passwordRegex.test(password)) {
                    return res.status(400).send({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number' });
                }
                // Upload image to Cloudinary if file exists
                if (req.file && req.file.buffer) {
                    const result = yield cloudinary_1.v2.uploader.upload_stream({
                        resource_type: 'auto'
                    }, req.file.buffer);
                    console.log(result, "result within this result");
                    imageUrl = result === null || result === void 0 ? void 0 : result.url;
                }
                // Find the user by userId
                const user = yield UserModel_1.UserModel.findOne({
                    where: {
                        id
                    }
                });
                if (!user) {
                    return res.status(404).send({
                        error: 'User not found'
                    });
                }
                // Update user's fields
                user.name = name || user.name;
                user.password = password || user.password;
                user.profile_pic = imageUrl || user.profile_pic;
                // Save the updated user
                yield user.save();
                res.status(200).send(user);
            }
            catch (error) {
                console.error('Error updating user:', error);
                res.status(500).send({ error: 'Internal server error' });
            }
        });
    },
    //change user status "active/inactive/suspended/deleted"
    changeUserStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { status } = req.body;
                // Check if the provided status is valid
                const validStatus = ["active", "inactive", "suspended", "deleted"];
                if (!validStatus.includes(status)) {
                    return res.status(400).send({
                        error: 'Invalid status provided'
                    });
                }
                // Find the user by userId
                const user = yield UserModel_1.UserModel.findOne({
                    where: {
                        id
                    }
                });
                if (!user) {
                    return res.status(404).send({
                        error: 'User not found'
                    });
                }
                // Update the user status
                user.status = status;
                yield user.save();
                res.status(200).send({
                    message: 'User status updated successfully',
                    user
                });
            }
            catch (error) {
                console.error('Error updating user status:', error);
                res.status(500).send({
                    error: 'Internal server error'
                });
            }
        });
    }
};
exports.UserEnrollment = {
    enrollmentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { courseId } = req.body;
                const userId = req.sqlUID;
                // Check if the user is already enrolled in the course
                const existingEnrollment = yield UserCourseModel_1.UserCourse.findOne({
                    where: {
                        userId,
                        courseId
                    }
                });
                if (existingEnrollment) {
                    return res.status(400).send({
                        message: 'User is already enrolled in this course'
                    });
                }
                //enrollment
                yield UserCourseModel_1.UserCourse.create({
                    userId,
                    courseId
                });
                const enrollmentDetail = yield UserCourseModel_1.UserCourse.findOne({
                    where: {
                        userId,
                        courseId
                    },
                    include: [
                        {
                            model: CourseModel_1.CourseModel,
                            as: "course_details",
                            required: false
                        },
                        {
                            model: UserModel_1.UserModel,
                            as: "user_details",
                            required: false
                        }
                    ]
                });
                const courseTitle = (_a = enrollmentDetail === null || enrollmentDetail === void 0 ? void 0 : enrollmentDetail.course_details) === null || _a === void 0 ? void 0 : _a.title;
                const userEmail = (_b = enrollmentDetail === null || enrollmentDetail === void 0 ? void 0 : enrollmentDetail.user_details) === null || _b === void 0 ? void 0 : _b.email;
                (0, notificationFunctions_1.sendCourseEnrolled)(userEmail, courseTitle);
                res.status(201).send({
                    message: 'Enrolled successful'
                });
            }
            catch (error) {
                console.log(error, "error");
                res.status(500).send({
                    message: 'Internal server error'
                });
            }
        });
    },
    getEnrolledCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.sqlUID;
            const courseList = yield UserCourseModel_1.UserCourse.findAll({
                where: {
                    userId
                },
                include: [
                    {
                        model: CourseModel_1.CourseModel,
                        required: false,
                        as: "course_details"
                    },
                    {
                        model: UserModel_1.UserModel,
                        required: false,
                        as: "user_details"
                    }
                ]
            });
            res.send(courseList);
        });
    }
};
//# sourceMappingURL=userController.js.map