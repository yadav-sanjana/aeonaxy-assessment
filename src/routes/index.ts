import express from 'express'
import { UserController } from '../controllers/userController';
import { upload } from '../config/cloudImage';
import { CourseController } from '../controllers/courseController';

const router = express.Router()

router.get('/', (req, res) => {
    res.send({
        message: "all api routes"
    });
})


//users routes
router.get('/user', UserController.getUsers)
router.get('/user/:id', UserController.getUserByID)
router.post('/user', upload.single('profile_pic'), UserController.registerUser)
router.patch('/user/:id', upload.single('profile_pic'), UserController.updateUser)
router.put('/user/:id', UserController.changeUserStatus)

//course Routes
router.get('/course', CourseController.fetchCourseList)
router.get('/course/:id', CourseController.fetchCourseByID)


export default router