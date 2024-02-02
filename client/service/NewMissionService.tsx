import axios from 'axios';

import { useAppDispatch } from "../hooks";
import { setPlaces } from "../slices/placesSlice";

const dispatch = useAppDispatch();
const base_url = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000`
const numOfPlaces = 20

const fetchNewMissions = async (cityName: string) => {
  await axios.get(`${base_url}/place/getByCity/${cityName}/sample/${numOfPlaces}`).then((res) => {
    dispatch(setPlaces(res.data))
  }).catch((err) => {
    console.log(err)
  })
}

export {fetchNewMissions}