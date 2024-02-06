import React, { useEffect, useState } from "react";
import OneStamp from "./OneStamp";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Profile } from "../../client-types/Profile";
import { profile } from "console";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getAverageRatingsForUsersEntries } from "./DashboardsServices";
import Typewriter from "../../utils/TypewriterLoading";

export default function IDCard ({profileData}: {profileData: Profile}) {
  const userId = useSelector((state: RootState) => state.user.id);
  const [avg, setAvg] = useState<number | null>(null)
  const [badges, setBadges] = useState<BadgeType[]>([])

  // Point for commenting, making entries, giving ratings
  // Average

  // Harsh Critic - Giving low ratings
  // Normal distribution - 2.5 ratings
  // Easily pleased? - Giving high ratings

  // Popular - your entries are highly rated

  // Expert Researcher - Making lots of entries
  // An alien of few words - short entries

  const load =  () => {
    if (userId != null) {
      getAverageRatingsForUsersEntries(userId, setAvg)
    }
  }

  useEffect( () => {
    load();
  }, [userId])

  useEffect(() => {
    setBadges([
      {
        // Making connections
        image: '',
        description: 'You commented for the first time.',
        condition: (profileData) => {
          if (profileData.userComments.length > 1) {return true}
          return false
        }
      },
      {
        //Opinionated
        image: '',
        description: 'You like to comment!',
        condition: (profileData) => {
          if (profileData.userComments.length > 20) {return true}
          return false
        }
      },
      {
        // Fresh Out The Academy
        image: '',
        description: 'You made your first entry',
        condition: (profileData) => {
          if (profileData.userEntries.length > 1) {return true}
          return false
        }
      },
      {
        // Expert Researcher
        image: '',
        description: 'You made a lot of entries!.',
        condition: (profileData) => {
          if (profileData.userComments.length > 25) {return true}
          return false
        }
      },
      {
        // Harsh Critic
        image: '',
        description: 'You rate entries low!',
        condition: (profileData) => {
          const avg: number = profileData.userRatings.reduce( (acc: number ,current) => {
           return acc += current.value / profileData.userRatings.length
          }, 0)
          if (avg < 2) {return true}
          return false
        }
      },
      {
        // Delighted
        image: '',
        description: 'You rate entries highly!',
        condition: (profileData) => {
          const avg: number = profileData.userRatings.reduce( (acc: number ,current) => {
           return acc += current.value / profileData.userRatings.length
          }, 0)
          if (avg >= 4) {return true}
          return false
        }
      },
      {
        // Normal Distribution
        image: '',
        description: 'You rate at exactly 2.5!',
        condition: (profileData) => {
          const avg: number = profileData.userRatings.reduce( (acc: number ,current) => {
           return acc += current.value / profileData.userRatings.length
          }, 0)
          if (avg == 2.5) {return true}
          return false
        }
      },
      { // Highly Esteemed
        image: '',
        description: 'People like your entries!',
        condition: (profileData) => {
          if (avg && avg > 4 ) {return true}
          return false
        }
      },
    ])
  }, [avg])

//Fresh out of the academy - 1st entry

  // Opinionated - Lots of comments
  type BadgeType = {
      image: string
      description: string
      condition: (profileData: Profile) => boolean
    }



  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainTitleContainer}>
        <Text style={styles.mainTitleText}>RESEARCHER I.D.</Text>
      </View>

      <View style={styles.topHalfContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsNameText}><Typewriter text={profileData.userName} delay={50}/></Text>
          <Text style={styles.detailsAlienText}><Typewriter text="Max Height: 32 ⍙" delay={50}/></Text>
          <Text style={styles.detailsAlienText}><Typewriter text="Timespace: 900 ⊬⋉" delay={50}/></Text>
          <Text style={styles.detailsAlienText}><Typewriter text="Low-Grav Authorized ⏚" delay={50}/></Text>
        </View>

        <View style={styles.topHalfSpacer}>

        </View>

        <View style={styles.faceImage}>
          <Text>TEST</Text>
        </View>
      </View>

      <ScrollView horizontal style={styles.bottomHalfContainer}>
        {badges.map(badge => {
          if (badge.condition(profileData)) {
            return <OneStamp image={badge.image} description={badge.description} />
          }
        })}
      </ScrollView>
    </View>
   )
  }

  const styles = StyleSheet.create({
    mainContainer: {
      borderWidth: 1,
      margin: 20,
      height: 250,
    },
    mainTitleContainer: {
      alignItems: "center",
      borderWidth: 1
    },
    mainTitleText: {
      fontFamily: "Gruppe_A",
      fontSize: 24,
      margin: 5,
    },
    topHalfContainer: {
      borderWidth: 1,
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between"
    },
    detailsContainer: {
      fontFamily: "Gruppe_A",
      borderWidth: 1,
      margin: 5,
    },
    topHalfSpacer:{
      flex: 1
    },
    bottomHalfContainer: {
      borderWidth: 1,
      flex: 1
    },
    detailsNameText: {
      fontFamily: "Gruppe_A",
      textDecorationLine: 'underline',
      fontSize: 20,
    },
    detailsAlienText: {
      fontFamily: "Gruppe_A",
    },
    faceImage: {
      flex: 1,
      borderWidth: 1
    },
    stampsContainer: {

    },
    oneStamp: {},

  })


