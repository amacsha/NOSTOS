const Router = require('@koa/router')
const router = new Router();

import {getEntry, postEntry, getCityEntries, getPlaceEntries} from './controllers/entry.controller'
import {getAvgEntryRating, getUserRating, setUserRating} from './controllers/rating.controller'

router.post('/entry/addOne', postEntry)
router.get('/entry/getOne/:entryID', getEntry)
router.get('/entry/getMany/byPlace/:placeID', getPlaceEntries)
router.get('/entry/getMany/byCity/:cityName', getCityEntries)

router.post('/rating/setUserRating', setUserRating)
router.get('/rating/onEntry/:entryID/byUser/:userID', getUserRating)
router.get('/rating/AverageEntryRating/:entryID', getAvgEntryRating)

module.exports = router;