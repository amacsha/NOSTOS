import axios, { AxiosResponse } from 'axios';
import { SmallEntry } from '../../client-types/SmallEntry';
import { updateFilterPreference, updateUserDetails } from '../../slices/userSlice';
import { LastVisited } from '../../client-types/LastVisited';
import { Profile } from '../../client-types/Profile';
import { Entry } from '../../client-types/Entry';
import { Alert } from 'react-native';
import { setAuth } from '../../slices/authSlice';
import { save } from '../../utils/secureStorage';
import { setActiveMission } from '../../slices/entriesSlice';


const base_url = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000`

const cityFetcher = async (cityName: string, setter: React.Dispatch<React.SetStateAction<(SmallEntry & { avg: number })[]>>) => {
  const rawentries = axios.get<SmallEntry[]>(`${base_url}/entry/getMany/byCity/${cityName}`)
  const avgs = axios.get<{ entryId: number, _avg: { value: number } }[]>(`${base_url}/rating/AveragesForCity/${cityName}`)

  Promise.all([rawentries, avgs]).then(([rawentries, avgs]) => {
    setter(rawentries.data.map((entry) => {
      return { ...entry, avg: avgs.data.find(a => a.entryId == entry.id)?._avg.value || 0 }
    }))
  }).catch((err) => {
    console.log('cityFetcher:')
    console.log(err)
  })
}

const placeFetcher = async (placeId: string, setter: React.Dispatch<React.SetStateAction<(SmallEntry & { avg: number })[]>>) => {
  const rawentries = axios.get<SmallEntry[]>(`${base_url}/entry/getMany/byPlace/${placeId}`)
  const avgs = axios.get<{ entryId: number, _avg: { value: number } }[]>(`${base_url}/rating/AveragesForPlace/${placeId}`)

  Promise.all([rawentries, avgs]).then(([rawentries, avgs]) => {
    setter(rawentries.data.map((entry) => {
      return { ...entry, avg: avgs.data.find(a => a.entryId == entry.id)?._avg.value || 0 }
    }))
  }).catch((err) => {
    console.log('placeFetcher:')
    console.log(err)
  })
}

const updatePrefrence = async (newPrefrence: string, dispatch: any, userId: number, token: string) => {
  await axios.put(`${base_url}/user/setUserFilterPreference/${userId}`, { filter_preference: newPrefrence, token }).then(() => {
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

const getActiveMissions = async (userId: number, dispatch: any) => {
  await axios.get(`${base_url}/place/getRecent/${userId}`).then((res) => {
    dispatch(setActiveMission(res.data))
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

const getProfile = async (userId: number, token: string) => {
  try {
    const response = await axios.post<Profile>(`${base_url}/user/profile`, { userId, token });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log('Error getting profile.')
  }
}

const getLastVisited = async (userId: number) => {
  try {
    const response = await axios.get<LastVisited[]>(`${base_url}/last-visited/getLastUserPlaces/${userId}`);
    return response
  } catch (error) {
    console.log('Error getting profile.')
    return []
  }
}

const getManyEntries = async (entryIds: number[]) => {
  try {
    const response = (await axios.post<Entry[]>(`${base_url}/entry/getMany`, entryIds)).data;
    return response;
  } catch (error) {
    console.log(error)
  }
}

const updatePassword = (newPassword: string, oldPassword: string, userId: number, dispatch: any, token: string) => {
  axios.post(`${base_url}/user/updatePassword/${userId}`, { newPassword, oldPassword, token })
    .then((res) => {
      dispatch(setAuth({ isAuthenticated: true, token: res.data }))
      save('accessToken', res.data);
      Alert.alert('Success', 'Password was updated successfully.')
    })
    .catch((err) => { Alert.alert(err) })
}

const updateUsername = (newUsername: string, userId: number, dispatch: any, token: string) => {
  axios.post(`${base_url}/user/updateUsername/${userId}`, { newUsername, token })
    .then((res) => {
      dispatch(updateUserDetails({ username: newUsername }))
      save('username', newUsername);
      Alert.alert('Success', 'Username was updated successfully.');
    })
    .catch((err) => Alert.alert('Error updating username.'))
}

const deleteAccount = async (userId: number, token: string) => {
  await axios.post(`${base_url}/user/deleteUser/${userId}`, { token });
}

const getAverageRatingsForUsersEntries = (userId: number, setAvg: React.Dispatch<React.SetStateAction<number | null>>) => {
  axios.get<number | null>(`${base_url}/rating/AverageForUser/${userId}`)
    .then(res => setAvg(res.data))
    .catch(err => console.log(err))
}
export {
  getAverageRatingsForUsersEntries,
  deleteAccount,
  cityFetcher,
  updatePrefrence,
  getPrefrence,
  placeFetcher,
  getActiveMissions,
  getCities,
  getProfile,
  getLastVisited,
  getManyEntries,
  updatePassword,
  updateUsername
}