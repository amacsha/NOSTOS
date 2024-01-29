const Router = require('@koa/router');
const router = new Router();
import { getLastVisits, setLastVisit } from './controllers/lastVisited.controller';
import {createOneUser, deleteUser, getOneUser, getUserFilterPreference, loginUser, logoutUser, setUserFilterPreference} from './controllers/user.controller';
import {authMiddleware} from './middlewares/auth'

router.post('/user/createOneUser', createOneUser);
router.get('/user/getOneUser/:id', getOneUser);
router.delete('/user/deleteUser/:id', deleteUser);

router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);

router.put('/user/setUserFilterPreference/:id', setUserFilterPreference);
router.get('/user/getUserFilterPreference/:id', getUserFilterPreference);

router.post('/last-visited/setLastVisit/:id', setLastVisit);
router.get('/last-visited/getLastVisits/:id', getLastVisits);

module.exports = router;