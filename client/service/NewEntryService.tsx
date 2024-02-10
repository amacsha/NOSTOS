import axios from "axios";
import { Entry } from "../client-types/Entry";


const IP: string | undefined = process.env.EXPO_PUBLIC_IP_ADDRESS;

const NewEntryService = (newEntry: Entry, token: string, userId: number) => {
  const res = axios.post(`http://${IP}:3000/entry/addOne`, {
    newEntry,
    token,
    userId
  });
  return res;
};

export default NewEntryService;
