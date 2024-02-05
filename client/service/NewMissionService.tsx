import axios from 'axios';


import { setPlaces } from "../slices/placesSlice";
import { Place } from '../client-types/Place';


const base_url = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000`
const numOfPlaces = 20

const fetchNewMissions = async (cityName: string, dispatch: any) => {
  await axios.get<Place[]>(`${base_url}/place/getRandomByCity/${cityName}/sample/${numOfPlaces}`).then((res) => {
    dispatch(setPlaces(res.data))
  }).catch((err) => {
    console.log(err)
  })
}

export {fetchNewMissions}