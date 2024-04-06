import express from 'express'
import { UserController, UserEnrollment } from '../controllers/userController';
import { upload } from '../config/cloudImage';
import { CourseController } from '../controllers/courseController';
import { auth } from '../middlewares/auth';

const router = express.Router()

router.get('/', (req, res) => {
    res.send({
        message: "all api routes"
    });
})


//users routes
router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getUserByID)
router.post('/user', upload.single('profile_pic'), UserController.registerUser)
router.patch('/user/:id', auth, upload.single('profile_pic'), UserController.updateUser)
router.put('/user/:id', UserController.changeUserStatus)
router.get('/usertoken/:email', UserController.getUserToken)
router.get('/user', auth, UserController.userByToken)

//course Routes
router.get('/course', CourseController.fetchCourseList)
router.get('/course/:id', CourseController.fetchCourseByID)
router.post('/course', CourseController.createCourse)
router.patch('/course/:id', CourseController.updateCourse)

router.post('/enrollments', auth, UserEnrollment.enrollmentUser)
router.get('/enrollments', auth, UserEnrollment.getEnrolledCourse)


export default router