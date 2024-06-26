import { where } from 'sequelize';
import { UserCourse } from '../models/UserCourseModel';
import { UserModel } from '../models/UserModel';
import { v2 as cloudinary } from 'cloudinary';
import generateJwtToken from '../middlewares/auth';
import { CourseModel } from '../models/CourseModel';
import { sendCourseEnrolled, sendRegistered } from '../utils/notificationFunctions';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/

export const UserController = {

    //get user details by user id
    async getUserByID(req, res) {
        const id = req.params.id
        try {
            const user = await UserModel.findOne({
                where: {
                    id
                }
            });

            if (!user) {
                res.status(404).send({
                    message: "User not Found"
                })
            }

            res.send(user);
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error'
            });
        }
    },

    //get user by token (JWT) login system
    async userByToken(req, res) {
        const id = req.sqlUID

        const userDetail = await UserModel.findOne({
            where: {
                id
            }
        })

        if (!userDetail) {
            return res.status(404).send({
                error: "User not Exists"
            })
        }

        res.status(200).send(userDetail)
    },

    //generating jwt token for backend purpose
    async getUserToken(req, res) {
        const email = req.params.email
        try {
            const exist = await UserModel.findOne({
                where: {
                    email
                }
            })
            if (!exist) {
                return res.status(404).send({
                    message: "User not found"
                })

            }

            const token = generateJwtToken(exist?.get("id"), exist?.get("email"))

            res.send({
                user: exist,
                token: token
            })
        } catch (error) {
            console.log(error, "error occured")
            res.status(500).send({
                error: "Something went wrong"
            })
        }
    },

    // get user lists
    async getUsers(req, res) {
        try {
            const userList = await UserModel.findAll({});

            res.send(userList);
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error'
            });
        }
    },

    // create/register a new user
    async registerUser(req, res) {
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
                await new Promise<void>((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: 'auto' },
                        async (error, result) => {
                            if (error) {
                                console.error('Error uploading to Cloudinary:', error);
                                reject(error);
                                return;
                            }
                            console.log(result?.url, "result within this result");
                            imageUrl = result?.url || "";
                            resolve();
                        }
                    ).end(req.file.buffer);
                });
            }

            // Check if the email is already registered
            const existingUser = await UserModel.findOne({
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
            const newUser = await UserModel.create({
                name,
                email,
                password,
                profile_pic: imageUrl
            });

            sendRegistered(email, name)

            res.status(201).send(newUser);
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).send({
                error: 'Internal server error'
            });
        }
    },

    //update existing user
    async updateUser(req, res) {
        try {
            const id = req.query.id || req.sqlUID;
            const { name, password } = req.body;
            let imageUrl = '';

            if (!passwordRegex.test(password)) {
                return res.status(400).send({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number' });
            }

            // Upload image to Cloudinary if file exists
            if (req.file && req.file.buffer) {
                const result: any = await cloudinary.uploader.upload_stream({
                    resource_type: 'auto'
                }, req.file.buffer);
                console.log(result, "result within this result");
                imageUrl = result?.url;
            }

            // Find the user by userId
            const user = await UserModel.findOne({
                where: {
                    id
                }
            })
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
            await user.save();

            res.status(200).send(user);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).send({ error: 'Internal server error' });
        }
    },

    //change user status "active/inactive/suspended/deleted"
    async changeUserStatus(req, res) {
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
            const user = await UserModel.findOne({
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
            await user.save();

            res.status(200).send({
                message: 'User status updated successfully',
                user
            });
        } catch (error) {
            console.error('Error updating user status:', error);
            res.status(500).send({
                error: 'Internal server error'
            });
        }
    }

}

export const UserEnrollment = {
    async enrollmentUser(req, res) {
        try {
            const { courseId } = req.body;
            const userId = req.sqlUID

            // Check if the user is already enrolled in the course
            const existingEnrollment = await UserCourse.findOne({
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
            await UserCourse.create({
                userId,
                courseId
            });

            const enrollmentDetail = await UserCourse.findOne({
                where: {
                    userId,
                    courseId
                },
                include: [
                    {
                        model: CourseModel,
                        as: "course_details",
                        required: false
                    },
                    {
                        model: UserModel,
                        as: "user_details",
                        required: false
                    }
                ]
            })

            const courseTitle = enrollmentDetail?.course_details?.title
            const userEmail = enrollmentDetail?.user_details?.email

            sendCourseEnrolled(userEmail, courseTitle)

            res.status(201).send({
                message: 'Enrolled successful'
            });
        } catch (error) {
            console.log(error, "error")
            res.status(500).send({
                message: 'Internal server error'
            });
        }
    },

    async getEnrolledCourse(req, res) {
        const userId = req.sqlUID

        const courseList = await UserCourse.findAll({
            where: {
                userId
            },
            include: [
                {
                    model: CourseModel,
                    required: false,
                    as: "course_details"
                },
                {
                    model: UserModel,
                    required: false,
                    as: "user_details"
                }
            ]
        })

        res.send(courseList)
    }
}