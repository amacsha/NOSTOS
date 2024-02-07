import axios from "axios";
import { Place } from "../client-types/Place";

const base_url = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000`;

const setLastVisited = async (userId: number, placeId: string) => {
    try {
        await axios.post(`${base_url}/last-visited/setUserLastVisit`, {userId, placeId})
    } catch (error) {
     console.log(error);   
    }
}

export {setLastVisited};