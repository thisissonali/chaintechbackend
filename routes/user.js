import Express from "express";
import { register, login, getMyDetails, logout, updateMyDetails } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = Express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/getMyDetails/:id', isAuthenticated , getMyDetails);

router.put('/updateMyDetails/:id', isAuthenticated , updateMyDetails);

router.get('/logout', logout);

export default router;