import axios from "axios";

import { setPlaces } from "../slices/placesSlice";
import { Place } from "../client-types/Place";

const base_url = `${process.env.EXPO_PUBLIC_IP_ADDRESS}`;
const numOfPlaces = 20;

const fetchNewMissions = async (cityName: string, dispatch: any) => {
  await axios.get<Place[]>(`${base_url}/place/getRandomByCity/${cityName}/sample/${numOfPlaces}`).then((res) => {
    const places = res.data
    if (places.every((place) => place.id != 'codeworks')) {
      places.push({
        id: 'codeworks',
        lat: 51.49533329691091,
        lng: -0.12747515850679758,
        name: 'Codeworks',
        city: 'London'
      })
    }

    dispatch(setPlaces(res.data))
  }).catch((err) => {
    console.log(err)
  })
}

export {fetchNewMissions}