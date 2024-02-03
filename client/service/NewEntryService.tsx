import axios from "axios";
import { Entry } from "../client-types/Entry";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const IP: string | undefined = process.env.EXPO_PUBLIC_IP_ADDRESS;

const NewEntryService = async (newEntry: Entry, token: string) => {
  console.log(IP);
  const res = await axios.post(`http://${IP}:3000/entry/addOne`, {
    newEntry,
    token,
  });
  return res;
};

export default NewEntryService;
