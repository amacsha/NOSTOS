const Router = require('@koa/router');
const router = new Router();
import { getLastVisits, setLastVisit } from './controllers/lastVisited.controller';
import {createOneUser, deleteUser, getOneUser, getUserFilterPreference, loginUser, logoutUser, setUserFilterPreference} from './controllers/user.controller';
import {authMiddleware} from './middlewares/auth'

import {getEntry, postEntry, getCityEntries, getPlaceEntries} from './controllers/entry.controller'
import {getAvgEntryRating, getUserRating, setUserRating} from './controllers/rating.controller'
import { addNewPlace, getAllPlaces } from './controllers/place.controller';
import { addNewComment, getAllCommentsByEntry } from './controllers/comment.controller';

router.post('/entry/addOne', postEntry)
router.get('/entry/getOne/:entryID', getEntry)
router.get('/entry/getMany/byPlace/:placeID/sortBy/:sortPrefrence', getPlaceEntries)
router.get('/entry/getMany/byPlace/:placeID/', getPlaceEntries)
router.get('/entry/getMany/byCity/:cityName/sortBy/:sortPrefrence', getCityEntries)
router.get('/entry/getMany/byCity/:cityName/', getCityEntries)
router.delete('/entry/delete/:entryID')

router.post('/rating/setUserRating', setUserRating)
router.get('/rating/onEntry/:entryID/byUser/:userID', getUserRating)
router.get('/rating/AverageEntryRating/:entryID', getAvgEntryRating)

router.post('/user/createOneUser', createOneUser);
router.get('/user/getOneUser/:id', getOneUser);
router.delete('/user/deleteUser/:id', deleteUser);

router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);

router.put('/user/setUserFilterPreference/:id', setUserFilterPreference);
router.get('/user/getUserFilterPreference/:id', getUserFilterPreference);

router.post('/last-visited/setLastVisit/:id', setLastVisit);
router.get('/last-visited/getLastVisits/:id', getLastVisits);

router.post('/place/addNew', addNewPlace);
router.get('/place/getAll', getAllPlaces);

router.post('/comment/addNew', addNewComment);
router.get('/comment/getAll/:entryId', getAllCommentsByEntry);
router.delete('/comment/delete/byAuthor/:commenterId/forEntry/:entryId');


module.exports = router;