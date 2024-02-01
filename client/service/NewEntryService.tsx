import axios from "axios";
import { Entry } from "../client-types/Entry";

const IP: string | undefined = process.env.EXPO_PUBLIC_IP_ADDRESS;

const NewEntryService = (newEntry: Entry) => {
    console.log(IP)
    const res = axios.post(`${IP}/entry/addOne`, newEntry)
    console.log(res)
}

export default NewEntryService