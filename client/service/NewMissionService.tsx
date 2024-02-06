import axios from "axios";

import { setPlaces } from "../slices/placesSlice";
import { Place } from "../client-types/Place";

const base_url = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000`;
const numOfPlaces = 20;

const fetchNewMissions = async (cityName: string, dispatch: any) => {
  await axios
    .get<Place[]>(
      `${base_url}/place/getRandomByCity/${cityName}/sample/${numOfPlaces}`
    )
    .then((res) => {
      const places: Place[] = [...res.data, {
        id: "codeworks",
        lat: 51.49509390434229,
        lng: -0.12744603176603514,
        name: "Codeworks",
        city: "London",
      }];
      dispatch(setPlaces(places));
    })
    .catch((err) => {
      console.log(err);
    });
};

export { fetchNewMissions };
