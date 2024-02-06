import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getValueFor } from "../../utils/secureStorage";
import { deleteAccount, getLastVisited, getProfile, updatePassword, updateUsername } from "./DashboardsServices";
import { SafeAreaView, Text, Button, View, ScrollView, StyleSheet, Pressable, TouchableHighlight, Alert, TextInput, ActivityIndicator } from "react-native";
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
import { title } from "process";
import IDCard from "./IDCard";


type SectionVisibility = {
  showComments: boolean,
  showEntries: boolean,
  showRatings: boolean,
  showNewPassword: boolean,
  showNewUsername: boolean
}

export default function UserProfile () {
  const userId = useSelector((state: RootState) => state.user.id);
  const token: string = getValueFor("accessToken") || "";
  const [loading, setLoading] = useState<boolean>(true)

  const [profileData, setProfileData] = useState<Profile>({} as Profile)
  const [profileEntries, setProfileEntries] = useState<JSX.Element[]>([])
  const [profileComments, setProfileComments] = useState<JSX.Element[]>([])
  const [profileRatings, setProfileRatings] = useState<JSX.Element[]>([]);

  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
    showComments: false,
    showEntries: false,
    showRatings: false,
    showNewPassword: false,
    showNewUsername: false
  })

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [newUsername, setNewUsername] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  async function load () {
    // const profileResponse = (await getProfile(userId as number, token));
    // const {userEntries, userComments, userRatings }: Profile = profileResponse

    // // const {userEntries, userComments, userRatings } = (await getProfile(userId as number, token));
    // const userLastVisited: LastVisited[] = await getLastVisited(userId as number)

    const {userName, userEntries, userComments, userRatings }: any = (await getProfile(userId as number, token));
    const userLastVisited: any = await getLastVisited(userId as number)

    setProfileData(
       {
        userName,
        userEntries,
        userComments,
        userRatings,
        userLastVisited
      }
    )

      if (userEntries?.length > 0) {
        const entries: JSX.Element[] = userEntries.map((entry: Entry) => {
          return (
            <View style={styles.singleEntryContainer}>
              <Pressable onPress={() => {entry.id && dispatch(selectEntry(entry.id));navigation.navigate("EntryView" as never)}}>
                <Text style={styles.singleEntryText}>{entry.title}, {moment(entry.creation_date).fromNow()}</Text>
              </Pressable>
            </View>
          )
        });

        setProfileEntries(entries)
      }

      if (userComments?.length > 0) {
        const entryIds = userComments.map((comment: Comment) => comment.entryId);
        const entries: Entry[] = await getManyEntries(entryIds) || [];

        const commentsWithEntryTitle: JSX.Element[] = []
        userComments.forEach( (comment: Comment, index:number) => {
          const matchingEntry = entries.find((entry: Entry) => entry.id === comment.entryId)
            commentsWithEntryTitle.push(
              <Pressable onPress={() => {matchingEntry && dispatch(selectEntry(matchingEntry.id as number));navigation.navigate("EntryView" as never)}}>
                <Text style={styles.singleCommentText}>"{comment.content}" on {matchingEntry?.title}</Text>
              </Pressable>
            )
        })

       setProfileComments(commentsWithEntryTitle)
    }

    if (userRatings?.length > 0) {
      const entryIds = userRatings.map((rating: Rating) => rating.entryId);
      const entries: Entry[] = await getManyEntries(entryIds) || [];

      const ratingsWithEntryTitle: JSX.Element[] = [];
      userRatings.forEach( (rating: Rating, index: number) => {
        const matchingEntry = entries.find((entry: Entry) => entry.id === rating.entryId)
        ratingsWithEntryTitle.push(
          <Pressable onPress={() => {matchingEntry && dispatch(selectEntry(matchingEntry.id as number));navigation.navigate("EntryView" as never)}}>
            <Text style={styles.singleRatingText}>You rated {matchingEntry?.title} {Array(rating.value).fill('★')}</Text>
          </Pressable>
        )
      })

      setProfileRatings(ratingsWithEntryTitle);
    }

    setLoading(false);
  }

  useEffect( () => {
    userId != null && load();
  }, [userId, loading])

  function toggleSection(property: "showComments" | "showEntries" | "showRatings" | "showNewPassword" | "showNewUsername", value: boolean) {
    const update: SectionVisibility = {...sectionVisibility}
    update[property] = value;
    if (property == 'showNewPassword') update['showNewUsername'] = false
    if (property == 'showNewUsername') update['showNewPassword'] = false
    setSectionVisibility(update)
  }

  if (loading) return <ActivityIndicator />

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View>

          <View style={styles.controlsContainer}>
            <Text style={styles.mainTitleText}>Manage your profile.</Text>
            <Text style={styles.mainTitleText}>You are logged in as {profileData.userName}.</Text>
            <Logout />

            <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={() => {
              Alert.alert('Account Deletion', 'Are you sure you want to delete the account?', [
                {
                  text: 'Delete',
                  onPress: async () => {
                    await deleteAccount(userId as number, token);
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
            <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={() => {
              toggleSection('showNewPassword', !sectionVisibility.showNewPassword)
            }}>
              <Text style={styles.buttonText}>
                Change Password
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={() => {
              toggleSection('showNewUsername', !sectionVisibility.showNewUsername);
            }}>
              <Text style={styles.buttonText}>
                Change Username
              </Text>
            </TouchableHighlight>
          </View>

          {sectionVisibility.showNewPassword &&
          <>
          <View style={styles.newPasswordContainer}>
            <Text>Enter your old password:</Text>
            <TextInput secureTextEntry={true} placeholder="Current Password" onChangeText={setOldPassword}></TextInput>
            <Text>Enter your new password:</Text>
            <TextInput secureTextEntry={true} placeholder="New Password" onChangeText={setNewPassword}></TextInput>
            <Text>Confirm your new password:</Text>
            <TextInput secureTextEntry={true} placeholder="Confirm New Password" onChangeText={setConfirmPassword}></TextInput>

            <Pressable onPress={() => {
              if (newPassword.length == 0) {
                Alert.alert('Error', 'Password must be entered.')
              } else if (newPassword.length < 6) {
                Alert.alert('Error', 'Password must be at least six characters long.')
              } else if (newPassword !== confirmPassword) {
                Alert.alert('Error', 'Passwords don\'t match!');
              } else {
                updatePassword(newPassword, oldPassword, userId as number, dispatch, token)
              }
            }}>
              <Text>Update Password</Text>
            </Pressable>
          </View>
          </>}

          {sectionVisibility.showNewUsername &&
          <>
          <View style={styles.controlsContainer}>
            <Text>Enter new username:</Text>
            <TextInput placeholder={profileData.userName} onChangeText={setNewUsername} />
            <Pressable onPress={() => {
              if (newUsername === "") {
                Alert.alert('Error', "New username cannot be empty.")
              } else if (newUsername === profileData.userName) {
                Alert.alert('Error', 'New username must be different from the current username.');
              } else {
                updateUsername(newUsername, userId as number, dispatch, token);
              }
            }}>
              <Text>Update Username</Text>
            </Pressable>
          </View>
          </>
          }

          <IDCard profileData={profileData}/>

          <View style={styles.dataContainer}>
              <View style={styles.entriesContainer}>
                <Pressable onPress={() => toggleSection('showEntries', !sectionVisibility.showEntries)}>
                  {sectionVisibility.showEntries ? <Text style={styles.sectionTitleText}>Hide Your Entries</Text> : <Text style={styles.sectionTitleText}>Display Your Entries ({profileEntries.length})</Text>}
                </Pressable>
                {sectionVisibility.showEntries && profileEntries}
              </View>

              <View style={styles.commentsContainer}>
                <Pressable onPress={() => toggleSection('showComments', !sectionVisibility.showComments)}>
                {sectionVisibility.showComments ? <Text style={styles.sectionTitleText}>Hide Your Comments</Text> : <Text style={styles.sectionTitleText}>Display Your Comments ({profileComments.length})</Text>}
                </Pressable>
                {sectionVisibility.showComments && profileComments}
              </View>

              <View style={styles.ratingsContainer}>
                <Pressable onPress={() => toggleSection('showRatings', !sectionVisibility.showRatings)}>
                {sectionVisibility.showRatings ? <Text style={styles.sectionTitleText}>Hide Your Ratings</Text> : <Text style={styles.sectionTitleText}>Display Your Ratings ({profileRatings.length})</Text>}
                </Pressable>
                {sectionVisibility.showRatings && profileRatings}
              </View>
          </View>
      </View>
      </ScrollView>
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
  newPasswordContainer: {}
})