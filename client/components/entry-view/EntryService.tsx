import axios from 'axios';
const IP: string | undefined = process.env.EXPO_PUBLIC_IP_ADDRESS;

export default async function getOneEntry () {
  const entryId = 0 //WILL NEED PROPS
  const url = `http://${IP}:3000//entry/getOne/${entryId}`;

  return await axios.get(url);
}

async function getAllEntriesForPlace () {

}