import axios from 'axios';
import _ from 'underscore'
import { useAppDispatch } from "../hooks";
import { setPlaces } from "../slices/placesSlice";

const dispatch = useAppDispatch();
const base_url = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000`
const numOfPlaces = 20

const fetchNewMissions = async (cityName: string) => {
  await axios.get(`${base_url}/place/getByCity/${cityName}`).then((res) => {
    dispatch(setPlaces(_.sample(res.data, numOfPlaces)))
  }).catch((err) => {
    console.log(err)
  })
}

export {fetchNewMissions}