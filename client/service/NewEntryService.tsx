import axios from "axios";
import { Entry } from "../client-types/Entry";

const IP: string | undefined = process.env.EXPO_PUBLIC_IP_ADDRESS;

const NewEntryService = async (newEntry: Entry) => {
    console.log(IP)
    const res = await axios.post(`${IP}/entry/addOne`, newEntry)
    console.log(res)
    return res
}

export default NewEntryService