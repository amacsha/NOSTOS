import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getValueFor } from "../../utils/secureStorage";
import { getLastVisited, getProfile } from "./DashboardsServices";
import { SafeAreaView, Text, Button, View, ScrollView, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SmallEntry } from "../../client-types/SmallEntry";
import { Rating } from "../../client-types/Rating";
import { Comment } from "../../client-types/Comment";
import { LastVisited } from "../../client-types/LastVisited";
import { Profile } from "../../client-types/Profile";
import { Entry } from "../../client-types/Entry";
import moment from "moment";
import { getManyEntries } from "./DashboardsServices";

export default function UserProfile () {
  const userId = useSelector((state: RootState) => state.user.id);
  const token: string = getValueFor("accessToken") || "";
  const [loading, setLoading] = useState<boolean>(true)

  const [profileData, setProfileData] = useState<Profile>({} as Profile)
  const [profileEntries, setProfileEntries] = useState<JSX.Element[]>([])
  const [profileComments, setProfileComments] = useState<JSX.Element[]>([])
  const [profileRatings, setProfileRatings] = useState<JSX.Element[]>([]);

  const [sectionVisibility, setSectionVisibility] = useState<boolean[]>(Array(3).fill(false))

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

      if (profileData.userEntries?.length > 0) {
        const entries: JSX.Element[] = profileData.userEntries.map(entry => {
          return (
            <View style={styles.singleEntryContainer}>
              <Pressable>
                <Text>{entry.title}, {moment(entry.creation_date).fromNow()}</Text>
              </Pressable>
            </View>
          )
        });

        setProfileEntries(entries)
      }

      if (profileData.userComments?.length > 0) {
        const entryIds = profileData.userRatings.map(rating => rating.entryId);
        const entries: any = await getManyEntries(entryIds);

        const commentsWithEntryTitle: JSX.Element[] = []
        profileData.userComments.forEach( (comment, index) => {
          commentsWithEntryTitle.push(
            <Pressable>
              <Text>{comment.content} on {entries[index].title}</Text>
            </Pressable>
          )
        })

       setProfileComments(commentsWithEntryTitle)
    }

    if (profileData.userRatings?.length > 0) {
      const entryIds = profileData.userRatings.map(rating => rating.entryId);
      const entries: any = await getManyEntries(entryIds);

      const ratingsWithEntryTitle: JSX.Element[] = [];
      profileData.userRatings.forEach( (rating, index) => {
        ratingsWithEntryTitle.push(
          <Pressable>
            <Text>You rated {entries[index].title} {Array(rating.value).fill('★')}</Text>
          </Pressable>
        )
      })

      setProfileRatings(ratingsWithEntryTitle);
    }

    setLoading(false);
  }

  useEffect( () => {
    load();
  }, [loading])

  function toggleSection(state: boolean[], index: number) {
    const update = [...state];
    update[index] = !update[index];
    return update;
  }

  if (loading) return <Text>Loading...</Text>

  return (
    <SafeAreaView>
        <View style={styles.mainContainer}>
          <Text>Manage your profile.</Text>
          <Button title="Logout" />
          <Button title="Change Password" />
          <Button title="Change Username" />


          <ScrollView>
            <Pressable onPress={() => setSectionVisibility(p => toggleSection(p, 0))}>
              {sectionVisibility[0] ? <Text>Hide Your Entries</Text> : <Text>Display Your Entries</Text>}
            </Pressable>
            {sectionVisibility[0] && profileEntries}

            <Pressable onPress={() => setSectionVisibility(p => toggleSection(p, 1))}>
            {sectionVisibility[1] ? <Text>Hide Your Comments</Text> : <Text>Display Your Comments</Text>}
            </Pressable>
            {sectionVisibility[1] && profileComments}

            <Pressable onPress={() => setSectionVisibility(p => toggleSection(p, 2))}>
            {sectionVisibility[2] ? <Text>Hide Your Ratings</Text> : <Text>Display Your Ratings</Text>}
            </Pressable>
            {sectionVisibility[2] && profileRatings}
          </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {},
  entriesContainer: {
    borderWidth: 1,
  },
  singleEntryContainer: {
  },
  commentsContainer: {
    borderWidth: 1,

  },
  singleCommentContainer: {

  },
  lastVisitedContainer: {}
})