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
exports.UserController = void 0;
exports.UserController = {
    getUsers(_res, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const userList = await UserModel.findAll({});
                const userList = "hellp";
                console.log(userList);
                res.send(userList);
            }
            catch (error) {
                console.error('Error fetching users:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
};
// // const getUsers = async (req, res) => {
// //     const userList = await UserModel.findAll({})
// //     res.status(200).send(userList)
// // }
// // export const UserController = {getUsers}
// // const getUsers = async (req: Request, res: Response): Promise<void> => {
// //     try {
// //         const userList = await UserModel.findAll();
// //         console.log(userList);
// //         res.send(userList);
// //     } catch (error) {
// //         console.error('Error fetching users:', error);
// //         res.status(500).json({ error: 'Internal server error' });
// //     }
// // };
// const registerUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { name, email, password } = req.body;
//         // Check if the email is already registered
//         const existingUser = await UserModel.findOne({ where: { email } });
//         if (existingUser) {
//             res.status(400).json({ error: 'Email is already registered' });
//             return;
//         }
//         // Create new user
//         const newUser = await UserModel.create({ name, email, password });
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
// const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const userId = req.params.id; // Assuming userId is passed in the request
//         const { name, email, profilePicture } = req.body;
//         const user = await UserModel.findByPk(userId);
//         if (!user) {
//             res.status(404).json({ error: 'User not found' });
//             return;
//         }
//         // Update user profile
//         user.name = name || user.name;
//         user.email = email || user.email;
//         user.profilePicture = profilePicture || user.profilePicture;
//         await user.save();
//         res.json(user);
//     } catch (error) {
//         console.error('Error updating user profile:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
// export { registerUser, updateUserProfile, getUsers };
//# sourceMappingURL=userController.js.map