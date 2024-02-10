import Router from '@koa/router';
const router = new Router();
import { getLastVisits, setLastVisit } from './controllers/lastVisited.controller';
import {createOneUser, deleteUser, getOneUser, getProfile, getUserFilterPreference, getUsernameByID, loginUser, logoutUser, setUserFilterPreference, updatePassword, updateUsername, verifyUser} from './controllers/user.controller';
import {authMiddleware} from './middlewares/auth'

import {getEntry, postEntry, getCityEntries, getPlaceEntries, getManyEntries} from './controllers/entry.controller'
import {getAverageRatingsForUsersEntries, getAvgEntryRating, getAvgInCity, getAvgInPlace, getUserRating, setUserRating} from './controllers/rating.controller'
import { addManyPlaces, addNewPlace, getAllPlaces, getCityNames, getPlacesForCity, getRecentPlaces, getSamplePlacesForCity } from './controllers/place.controller';
import { addNewComment, deleteComment, getAllCommentsByEntry } from './controllers/comment.controller';
import { confirmSQLConnection } from './models/db';

router.get('/', confirmSQLConnection);

// ENTRY
router.post('/entry/addOne', postEntry)
router.get('/entry/getOne/:entryID', getEntry)
router.post('/entry/getMany', getManyEntries);
router.get('/entry/getMany/byPlace/:placeID/sortBy/:sortPrefrence', getPlaceEntries)
router.get('/entry/getMany/byPlace/:placeID', getPlaceEntries)
router.get('/entry/getMany/byCity/:cityName', getCityEntries)
router.delete('/entry/delete/:entryID')


// RATING
router.post('/rating/setUserRating', setUserRating)
router.get('/rating/onEntry/:entryID/byUser/:userID', getUserRating)
router.get('/rating/AverageEntryRating/:entryID', getAvgEntryRating)
router.get('/rating/AveragesForCity/:cityName', getAvgInCity)
router.get('/rating/AveragesForPlace/:placeID', getAvgInPlace)
router.get('/rating/AverageForUser/:userId', getAverageRatingsForUsersEntries)

// USER
router.post('/user/profile', getProfile)
router.post('/user/createOneUser', createOneUser);
router.get('/user/getOneUser/:id', getOneUser);
router.get('/user/getUsername/:id', getUsernameByID);
router.post('/user/deleteUser/:id', deleteUser);
router.put('/user/setUserFilterPreference/:id', setUserFilterPreference);
router.get('/user/getUserFilterPreference/:id', getUserFilterPreference);
router.post('/user/updateUsername/:id', updateUsername)
router.post('/user/updatePassword/:id', updatePassword)

// LAST-VISITED
router.get('/last-visited/getLastUserPlaces/:userId', getLastVisits);
router.post('/last-visited/setUserLastVisit', setLastVisit);

// LOGIN
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);

// PLACE
router.post('/place/addNew', addNewPlace);
router.get('/place/getAll', getAllPlaces);
router.get('/place/getRandomByCity/:cityName/sample/:numOfPlaces', getSamplePlacesForCity);
router.get('/place/getByCity/:cityName', getPlacesForCity);
router.post('/place/addMany', addManyPlaces);
router.get('/place/getRecent/:userId', getRecentPlaces)
router.get('/place/cities', getCityNames)

// COMMENT

//TODO re-visit route structure
router.post('/comment/addNew/:entryId', addNewComment);
router.get('/comment/getAll/:entryId', getAllCommentsByEntry);
router.delete('/comment/delete/byAuthor/:commenterId/forEntry/:entryId', deleteComment);


export default router;