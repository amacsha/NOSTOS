import axios from 'axios';
import { SmallEntry } from '../../client-types/SmallEntry';
import { updateFilterPreference } from '../../slices/userSlice';


const base_url = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000`

const cityFetcher = async (cityName: string, setter: React.Dispatch<React.SetStateAction<(SmallEntry & {avg: number})[]>>) => {
  const rawentries = axios.get<SmallEntry[]>(`${base_url}/entry/getMany/byCity/${cityName}`)
  const avgs = axios.get<{entryId: number, _avg: {value: number}}[]>(`${base_url}/rating/AveragesForCity/${cityName}`)

  Promise.all([rawentries, avgs]).then(([rawentries, avgs]) => {
    setter(rawentries.data.map((entry) => {
      return {...entry, avg: avgs.data.find(a => a.entryId == entry.id)?._avg.value || 0}
    }))
  }).catch((err) => {
    console.log('cityFetcher:')
    console.log(err)
  })
}

const placeFetcher = async (placeId: string, setter: React.Dispatch<React.SetStateAction<(SmallEntry & {avg: number})[]>>) => {
  const rawentries = axios.get<SmallEntry[]>(`${base_url}/entry/getMany/byPlace/${placeId}`)
  const avgs = axios.get<{entryId: number, _avg: {value: number}}[]>(`${base_url}/rating/AveragesForPlace/${placeId}`)

  Promise.all([rawentries, avgs]).then(([rawentries, avgs]) => {
    setter(rawentries.data.map((entry) => {
      return {...entry, avg: avgs.data.find(a => a.entryId == entry.id)?._avg.value || 0}
    }))
  }).catch((err) => {
    console.log('placeFetcher:')
    console.log(err)
  })
}

const updatePrefrence = async (newPrefrence: string, dispatch: any, userId: number, token: string) => {
  await axios.put(`${base_url}/user/setUserFilterPreference/${userId}`, {filter_preference: newPrefrence, token}).then(() => {
    dispatch(updateFilterPreference(newPrefrence))
  }).catch((err) => {
    console.log('updatePrefrence:')
    console.log(err)
  })
}

const getPrefrence = async (dispatch: any, userId: number) => {
  await axios.get(`${base_url}/user/getUserFilterPreference/${userId}`).then((res) => {
    dispatch(updateFilterPreference(res.data.filter_preference))
  }).catch((err) => {
    console.log("getPrefrence")
    console.log(err)
  })
}

const getActiveMissions = async (userId: number, setter: any) => {
  await axios.get(`${base_url}/place/getRecent/${userId}`).then((res) => {
    setter(res.data)
  }).catch((err) => {
    console.log("getActiveMissions")
    console.log(err)
  })
}

const getCities = async (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
  axios.get<string[]>(`${base_url}/place/cities`).then((res) => {
    setter(res.data)
  }).catch((err) => {
    console.log('placeFetcher:')
    console.log(err)
  })
}

export {cityFetcher, updatePrefrence, getPrefrence, placeFetcher, getActiveMissions, getCities}