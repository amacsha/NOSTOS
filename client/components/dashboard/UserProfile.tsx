import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getValueFor } from "../../utils/secureStorage";
import { deleteAccount, getLastVisited, getProfile } from "./DashboardsServices";
import { SafeAreaView, Text, Button, View, ScrollView, StyleSheet, Pressable, TouchableHighlight, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SmallEntry } from "../../client-types/SmallEntry";
import { Rating } from "../../client-types/Rating";
import { Comment } from "../../client-types/Comment";
import { LastVisited } from "../../client-types/LastVisited";
import { Profile } from "../../client-types/Profile";
import { Entry } from "../../client-types/Entry";
import moment from "moment";
import { getManyEntries } from "./DashboardsServices";
import { colors } from "../styles/colors";
import { useAppDispatch } from "../../hooks";
import { selectEntry } from '../../slices/entriesSlice';
import { useNavigation } from "@react-navigation/native";
import Logout from "../logout/Logout";
import { save } from "../../utils/secureStorage";
import { setAuth, initialState } from '../../slices/authSlice';
import { deleteItemAsync } from 'expo-secure-store';
import { updateUserDetails, initialState as userInitials } from '../../slices/userSlice';




export default function UserProfile () {
  const userId = useSelector((state: RootState) => state.user.id);
  const token: string = getValueFor("accessToken") || "";
  const [loading, setLoading] = useState<boolean>(true)

  const [profileData, setProfileData] = useState<Profile>({} as Profile)
  const [profileEntries, setProfileEntries] = useState<JSX.Element[]>([])
  const [profileComments, setProfileComments] = useState<JSX.Element[]>([])
  const [profileRatings, setProfileRatings] = useState<JSX.Element[]>([]);

  const [sectionVisibility, setSectionVisibility] = useState<boolean[]>(Array(3).fill(false))

  const dispatch = useAppDispatch();
  const navigation = useNavigation();


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
              <Pressable onPress={() => {dispatch(selectEntry(entry.id));navigation.navigate("EntryView" as never)}}>
                <Text style={styles.singleEntryText}>{entry.title}, {moment(entry.creation_date).fromNow()}</Text>
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
            <Pressable onPress={() => {dispatch(selectEntry(entries[index].id));navigation.navigate("EntryView" as never)}}>
              <Text style={styles.singleCommentText}>"{comment.content}" on {entries[index].title}</Text>
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
          <Pressable onPress={() => {dispatch(selectEntry(entries[index].id));navigation.navigate("EntryView" as never)}}>
            <Text style={styles.singleRatingText}>You rated {entries[index].title} {Array(rating.value).fill('★')}</Text>
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
    <SafeAreaView style={styles.mainContainer}>
        <View>

          <View style={styles.controlsContainer}>
            <Text style={styles.mainTitleText}>Manage your profile.</Text>
            <Logout />

            <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={() => {
              Alert.alert('Account Deletion', 'Are you sure you want to delete the account?', [
                {
                  text: 'Delete',
                  onPress: async () => {
                    await deleteAccount(userId as number, token);
//admin@nostos.com
                    await Promise.all([
                      deleteItemAsync('accessToken'),
                      deleteItemAsync('userId'),
                      deleteItemAsync('email'),
                      deleteItemAsync('username'),
                      deleteItemAsync('filter_preference'),
                  ])
                  dispatch(setAuth(initialState));
                  dispatch(updateUserDetails(userInitials))

                  navigation.navigate('Register' as never);

                  }
                },
                {
                  text: 'Cancel',
                  onPress: () => {}
                }
              ])
            }}>
              <Text style={styles.buttonText}>
                Delete Account
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={() => {}}>
              <Text style={styles.buttonText}>
                Change Password
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={() => {}}>
              <Text style={styles.buttonText}>
                Change Username
              </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.dataContainer}>
            <ScrollView>
              <View style={styles.entriesContainer}>
                <Pressable onPress={() => setSectionVisibility(p => toggleSection(p, 0))}>
                  {sectionVisibility[0] ? <Text style={styles.sectionTitleText}>Hide Your Entries</Text> : <Text style={styles.sectionTitleText}>Display Your Entries</Text>}
                </Pressable>
                {sectionVisibility[0] && profileEntries}
              </View>

              <View style={styles.commentsContainer}>
                <Pressable onPress={() => setSectionVisibility(p => toggleSection(p, 1))}>
                {sectionVisibility[1] ? <Text style={styles.sectionTitleText}>Hide Your Comments</Text> : <Text style={styles.sectionTitleText}>Display Your Comments</Text>}
                </Pressable>
                {sectionVisibility[1] && profileComments}
              </View>

              <View style={styles.ratingsContainer}>
                <Pressable onPress={() => setSectionVisibility(p => toggleSection(p, 2))}>
                {sectionVisibility[2] ? <Text style={styles.sectionTitleText}>Hide Your Ratings</Text> : <Text style={styles.sectionTitleText}>Display Your Ratings</Text>}
                </Pressable>
                {sectionVisibility[2] && profileRatings}
              </View>
            </ScrollView>
          </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.lighterPurple,
    flex: 1,
  },
  controlsContainer :{
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#45417B',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 3,
    padding: 3,
    height: 30,
    width: 200,
    fontFamily: 'Gruppe_A',
  },
  buttonText: {
    color: '#9578F8',
    fontSize: 17,
    fontFamily: 'Gruppe_A',
  },
  mainTitleText: {
    fontFamily: "Gruppe_A",
    fontSize: 23,
    marginBottom: 30
  },
  dataContainer: {
    margin: 15,
    alignItems: 'center'
  },
  sectionTitleText: {
    fontSize: 23,
    fontFamily: 'Gruppe_A',
  },
  entriesContainer: {
  },
  singleEntryContainer: {
  },
  singleEntryText: {
    fontFamily: "Gruppe_A",
    fontSize: 12,
    paddingLeft: 30,
    margin: 3
  },
  commentsContainer: {
  },
  singleCommentContainer: {
    // margin: 5
  },
  singleCommentText: {
    fontFamily: "Gruppe_A",
    fontSize: 12,
    paddingLeft: 30,
    margin: 3
  },
  ratingsContainer: {
  },
  singleRatingContainer: {
  },
  singleRatingText: {
    fontFamily: "Gruppe_A",
    fontSize: 12,
    paddingLeft: 30,
    margin: 3
  },
})