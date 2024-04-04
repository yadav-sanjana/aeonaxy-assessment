import express from 'express'
import { UserController } from '../controllers/userController';

const router = express.Router() 

router.get('/',  (req, res) => {
    res.send({
        message : "all api routes"
    });
})

router.get('/user', UserController.getUsers)
router.post('/user', UserController.registerUser)


export default router