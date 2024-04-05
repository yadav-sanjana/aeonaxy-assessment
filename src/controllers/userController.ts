import { UserModel } from '../models/UserModel';
import { v2 as cloudinary } from 'cloudinary';
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

    //get user by token (JWT)
    // pass

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
            const id = req.params.id;
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
    }
}