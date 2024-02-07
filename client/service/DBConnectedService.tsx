import axios from "axios";

export default async function confirmDBIsConnected() {
  const IP = process.env.EXPO_PUBLIC_IP_ADDRESS;
  try {
      await axios.get(`http://${IP}:3000/`);
      return true;
  } catch (error) {
      console.log('Error connecting to the server.');
      throw new Error('Cannot connect to server.');
  }
}