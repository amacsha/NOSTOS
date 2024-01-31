import axios from 'axios';
const IP: string | undefined = process.env.EXPO_PUBLIC_IP_ADDRESS;

/*
router.post('/rating/setUserRating', setUserRating)
router.get('/rating/onEntry/:entryID/byUser/:userID', getUserRating)
router.get('/rating/AverageEntryRating/:entryID', getAvgEntryRating)
*/

export async function getOneEntry (entryId: number) {
  const url = `http://${IP}:3000/entry/getOne/${entryId}`;

  return await axios.get(url);
}

export async function getAverageRating (entryId: number) {
  const url = `http://${IP}:3000/rating/AverageEntryRating/${entryId}`;
  const response = await axios.get(url)
  return response.data._avg.value
}

export async function getRating (entryId: number, userId: number) {
  const url = `http://${IP}:3000/rating/onEntry/${entryId}/byUser/${userId}`;
  return await axios.get(url);
}

export async function countRatings(entryId: number) {
  const url = `http://${IP}:3000/rating/count/${entryId}`
  const response = await axios.get(url);
  return response.data;
}

export async function updateRating (entryId: number, userId: number, value: number) {
  const url = `http://${IP}:3000/rating/setUserRating`;
  const data = {
    raterId: userId,
    entryId: entryId,
    value
  }

  await axios.post(url, data)
}