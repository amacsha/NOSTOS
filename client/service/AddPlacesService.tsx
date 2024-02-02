import axios from "axios";
import { Place } from "../client-types/Place";

const IP: string | undefined = process.env.EXPO_PUBLIC_IP_ADDRESS;

const AddPlacesService = async (newPlaces: Place[]) => {
    const res = await axios.post(`http://${IP}:3000/place/addMany`, newPlaces);
    return res;
}

export default AddPlacesService