import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getValueFor } from "../../utils/secureStorage";
import { getLastVisited, getProfile } from "./DashboardsServices";
import { SafeAreaView, Text, Button, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SmallEntry } from "../../client-types/SmallEntry";
import { Rating } from "../../client-types/Rating";
import { Comment } from "../../client-types/Comment";
import { LastVisited } from "../../client-types/LastVisited";
import { Profile } from "../../client-types/Profile";

export default function UserProfile () {
  const userId = useSelector((state: RootState) => state.user.id);
  const token: string = getValueFor("accessToken") || "";
  const [loading, setLoading] = useState<boolean>(true)

  const [profileData, setProfileData] = useState<Profile>({} as Profile)

  async function load () {
    // const profileResponse = (await getProfile(userId as number, token));
    // const {userEntries, userComments, userRatings }: Profile = profileResponse

    // // const {userEntries, userComments, userRatings } = (await getProfile(userId as number, token));
    // const userLastVisited: LastVisited[] = await getLastVisited(userId as number)

    const {userEntries, userComments, userRatings }: any = (await getProfile(userId as number, token));
    const userLastVisited: any = await getLastVisited(userId as number)

    setProfileData( () => {
      return {
        userEntries,
        userComments,
        userRatings,
        userLastVisited
      }
    })

    setLoading(false);
  }

  load();

  useEffect( () => {
    load();
  }, [])

  if (loading) return <Text>Loading...</Text>

  return (
    <SafeAreaView>
      <Text>
        {profileData.userComments.map(comment => <Text>{comment.content}</Text>)}
      </Text>
    </SafeAreaView>
  )
}