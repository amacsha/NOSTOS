import axios from "axios";
import { getValueFor } from "./secureStorage";

export default async function verifyUser(): Promise<boolean> {
  const base_url = `${process.env.EXPO_PUBLIC_IP_ADDRESS}`;
  try {
    const data = { data: getValueFor("accessToken") };
    const response = await axios.post(base_url + "/user/verify", data);
    if (response.data.isAuthenticated) return true;
    return false;
  } catch (error) {
    console.log('Front end: verifyUser', error);
    return false;
  }
}
