import axios from "axios";
import { Alert } from "react-native";
const IP: string | undefined = process.env.EXPO_PUBLIC_IP_ADDRESS;

export async function getOneEntry(entryId: number) {
  const url = `${IP}/entry/getOne/${entryId}`;

  return (await axios.get(url)).data;
}

export async function getAverageRating(entryId: number) {
  const url = `${IP}/rating/AverageEntryRating/${entryId}`;
  const response = await axios.get(url);
  return response.data._avg.value;
}

export async function getRating(entryId: number, userId: number) {
  const url = `${IP}/rating/onEntry/${entryId}/byUser/${userId}`;
  return await axios.get(url);
}

export async function countRatings(entryId: number) {
  const url = `${IP}/rating/count/${entryId}`;
  const response = await axios.get(url);
  return response.data;
}

export async function updateRating(
  entryId: number,
  userId: number,
  value: number,
  token: string
) {
  const url = `${IP}/rating/setUserRating`;
  const data = {
    raterId: userId,
    entryId: entryId,
    value,
    token,
  };

  axios.post(url, data);
}

export async function getComments(entryId: number) {
  const url = `${IP}/comment/getAll/${entryId}`;
  const response = await axios.get(url);
  return response.data;
}

export async function postComment(
  entryId: number,
  commenterId: number,
  content: string,
  token: string
) {
  const data = {
    commenterId,
    content,
    token,
  };
  const url = `${IP}/comment/addNew/${entryId}`;
  const response = axios.post(url, data);
}

export async function getUsernameFromID(commenterId: number) {
  const url = `${IP}/user/getUsername/${commenterId}`;
  const response = await axios.get(url);
  return response.data;
}

export async function deleteComment(userId: string, entryId: number) {
  const url = `${IP}/comment/delete/byAuthor/${userId}/forEntry/${entryId}`;
  axios.delete(url).then(() => {
    Alert.alert('Comment deleted!')
  });
}