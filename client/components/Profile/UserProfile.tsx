import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getValueFor } from "../../utils/secureStorage";
import { deleteAccount, getLastVisited, getProfile, updatePassword, updateUsername } from "../dashboard/DashboardsServices";
import {Text, Button, View, ScrollView, StyleSheet, Pressable, TouchableHighlight, Alert, TextInput, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SmallEntry } from "../../client-types/SmallEntry";
import { Rating } from "../../client-types/Rating";
import { Comment } from "../../client-types/Comment";
import { LastVisited } from "../../client-types/LastVisited";
import { Profile } from "../../client-types/Profile";
import { Entry } from "../../client-types/Entry";
import moment from "moment";
import { getManyEntries } from "../dashboard/DashboardsServices";
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
import { SafeAreaView } from "react-native-safe-area-context";

type SectionVisibility = {
  showComments: boolean,
  showEntries: boolean,
  showRatings: boolean,
  showNewPassword: boolean,
  showNewUsername: boolean,
  showProfileActions: boolean,
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
    showNewUsername: false,
    showProfileActions: false,
  })

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [newUsername, setNewUsername] = useState<string>("");
  const myRef = React.createRef<ScrollView>()

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  async function load () {
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
            <View key={entry.id}>
              <TouchableHighlight underlayColor="#322F58" style={styles.contributionListItem} onPress={() => {entry.id && dispatch(selectEntry(entry.id));navigation.navigate("EntryView" as never)}}>
                <Text style={styles.buttonText}>{entry.title}, {moment(entry.creation_date).fromNow()}</Text>
              </TouchableHighlight>
            </View>
          )
        });

        setProfileEntries(entries)
      }

      if (userComments?.length > 0) {
        const entryIds = userComments.map((comment: Comment) => comment.entryId);
        const entries: Entry[] = await getManyEntries(entryIds) || [];

        const commentsWithEntryTitle: JSX.Element[] = []
        userComments.sort((a: Comment, b: Comment) => { 
          return a.creation_date && b.creation_date ? 
            new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime() :
            0;
        }).forEach( (comment: Comment, index:number) => {
          const matchingEntry = entries.find((entry: Entry) => entry.id === comment.entryId)
            commentsWithEntryTitle.push(
              <TouchableHighlight underlayColor="#322F58" style={styles.contributionListItem} key={index} onPress={() => {matchingEntry && dispatch(selectEntry(matchingEntry.id as number));navigation.navigate("EntryView" as never)}}>
                <Text style={styles.buttonText}>"{comment.content}" on {matchingEntry?.title}</Text>
              </TouchableHighlight>
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
          <TouchableHighlight underlayColor="#322F58" key={index} style={styles.contributionListItem} onPress={() => {matchingEntry && dispatch(selectEntry(matchingEntry.id as number));navigation.navigate("EntryView" as never)}}>
            <Text style={styles.buttonText}>You rated "{matchingEntry?.title}" {Array(rating.value).fill('★')}</Text>
          </TouchableHighlight>
        )
      })

      setProfileRatings(ratingsWithEntryTitle);
    }

    setLoading(false);
  }

  useEffect( () => {
    userId != null && load();
  }, [userId, loading])

  function toggleSection(property: "showComments" | "showEntries" | "showRatings" | "showNewPassword" | "showNewUsername" | "showProfileActions", value: boolean) {
    const update: SectionVisibility = {...sectionVisibility}
    update[property] = value;
    if (property == 'showNewPassword') update['showNewUsername'] = false
    if (property == 'showNewUsername') update['showNewPassword'] = false
    setSectionVisibility(update)
  }

  if (loading) return <View style={styles.load}>
    <ActivityIndicator />
  </View> 

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView ref={myRef}>
        <View>
        <Text style={styles.mainTitleText}>Manage your profile</Text>

          <IDCard profileData={profileData}/>

          <View style={styles.dataContainer}>
              <View style={styles.contributonList}>
                <Pressable onPress={() => toggleSection('showEntries', !sectionVisibility.showEntries)}>
                  {sectionVisibility.showEntries ? <Text style={styles.text}>Hide Your Entries</Text> : <Text style={styles.text}>Display Your Entries ({profileEntries.length})</Text>}
                </Pressable>
                {sectionVisibility.showEntries && profileEntries}
              </View>

              <View style={styles.contributonList}>
                <Pressable onPress={() => toggleSection('showComments', !sectionVisibility.showComments)}>
                {sectionVisibility.showComments ? <Text style={styles.text}>Hide Your Comments</Text> : <Text style={styles.text}>Display Your Comments ({profileComments.length})</Text>}
                </Pressable>
                {sectionVisibility.showComments && profileComments}
              </View>

              <View style={styles.contributonList}>
                <Pressable onPress={() => toggleSection('showRatings', !sectionVisibility.showRatings)}>
                {sectionVisibility.showRatings ? <Text style={styles.text}>Hide Your Ratings</Text> : <Text style={styles.text}>Display Your Ratings ({profileRatings.length})</Text>}
                </Pressable>
                {sectionVisibility.showRatings && profileRatings}
              </View>

              <View style={styles.contributonList}>
                <Pressable onPress={() => {
                  toggleSection('showProfileActions', !sectionVisibility.showProfileActions);
                  myRef.current?.scrollToEnd({ animated: true })
                }}>
                {sectionVisibility.showProfileActions ? <Text style={styles.text}>Hide Profile actions</Text> : <Text style={styles.text}>Show Profile actions</Text>}
                </Pressable>
              </View>
          </View>

          {sectionVisibility.showProfileActions && <>
            <View style={styles.controlsContainer}>
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
                toggleSection('showNewPassword', !sectionVisibility.showNewPassword);
                myRef.current?.scrollToEnd({ animated: true })
              }}>
                <Text style={styles.buttonText}>
                  Change Password
                </Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={() => {
                toggleSection('showNewUsername', !sectionVisibility.showNewUsername);
                myRef.current?.scrollToEnd({ animated: true })
              }}>
                <Text style={styles.buttonText}>
                  Change Username
                </Text>
              </TouchableHighlight>
            </View>

            {sectionVisibility.showNewPassword &&
            <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Enter your old password:</Text>
              <TextInput style={styles.inputField} secureTextEntry={true} placeholder="Current Password" onChangeText={setOldPassword}></TextInput>
              <Text style={styles.inputTitle}>Enter your new password:</Text>
              <TextInput style={styles.inputField} secureTextEntry={true} placeholder="New Password" onChangeText={setNewPassword}></TextInput>
              <Text style={styles.inputTitle}>Confirm your new password:</Text>
              <TextInput style={styles.inputField} secureTextEntry={true} placeholder="Confirm New Password" onChangeText={setConfirmPassword}></TextInput>

              <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={() => {
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
                <Text style={styles.buttonText}>Update Password</Text>
              </TouchableHighlight>
            </View>
            </>}

            {sectionVisibility.showNewUsername &&
            <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Enter new username:</Text>
              <TextInput style={styles.inputField} placeholder={profileData.userName} onChangeText={setNewUsername} />
              <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={() => {
                if (newUsername === "") {
                  Alert.alert('Error', "New username cannot be empty.")
                } else if (newUsername === profileData.userName) {
                  Alert.alert('Error', 'New username must be different from the current username.');
                } else {
                  updateUsername(newUsername, userId as number, dispatch, token);
                  setLoading(true);
                }
              }}>
                <Text style={styles.buttonText}>Update Username</Text>
              </TouchableHighlight>
            </View>
            </>
            }
          </>}

      </View>
      </ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.darkGrey,
    flex: 1,
  },
  load: {
    backgroundColor: colors.darkGrey,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 30,
    marginBottom: 25,
    marginTop: 50,
    textAlign: 'center',
    color: 'white'
  },
  text: {
    fontFamily: "Gruppe_A",
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
    marginTop: 30
  },
  dataContainer: {
    margin: 15,
    alignItems: 'center',
    gap: 20,
  },
  contributionListItem: {
    backgroundColor: '#45417B',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 3,
    padding: 3,
    fontFamily: 'Gruppe_A',
    width: 350,
  },
  contributonList: {
    alignItems: 'center',
  },
  inputField: {
    backgroundColor: colors.gunMetalGrey,
    color: colors.darkGrey,
    marginVertical: 5,
    marginHorizontal: 25,
    paddingLeft: 5,
    fontSize: 15,
    fontFamily: 'Gruppe_A',
    width: 350,
  },
  inputTitle: {
    fontSize: 15,
    fontFamily: 'Gruppe_A',
    marginHorizontal: 25,
    color: 'white',
  },
  inputContainer: {
    marginTop: 30,
    gap: 3,
    padding: 10
  },
})