import React, { useEffect, useState } from "react";
import OneStamp from "./OneStamp";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Profile } from "../../client-types/Profile";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getAverageRatingsForUsersEntries } from "../dashboard/DashboardsServices";
import { colors } from "../styles/colors";
import Images from "../../assets/aliens/picIndexes";

const mapNameToPic =  (name: string) => {
  const alphabet = name.toLowerCase().match(/[a-z]/g)
  return alphabet?.length ? alphabet[0] : "b"
}

export default function IDCard ({profileData}: {profileData: Profile}) {
  const userId = useSelector((state: RootState) => state.user.id);
  const [avg, setAvg] = useState<number | null>(null)
  const [badges, setBadges] = useState<BadgeType[]>([])

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
        image: require('../../assets/badges/making-connections.png'),
        description: 'You commented for the first time.',
        condition: (profileData) => {
          if (profileData.userComments.length > 1) {return true}
          return false
        }
      },
      {
        //Opinionated
        image: require('../../assets/badges/opinionated.png'),
        description: 'You like to comment!',
        condition: (profileData) => {
          if (profileData.userComments.length > 20) {return true}
          return false
        }
      },
      {
        // Fresh Out The Academy
        image: require('../../assets/badges/out-the-academy.png'),
        description: 'You made your first entry',
        condition: (profileData) => {
          if (profileData.userEntries.length > 1) {return true}
          return false
        }
      },
      {
        // Expert Researcher
        image: require('../../assets/badges/expert-researcher.png'),
        description: 'You made a lot of entries!.',
        condition: (profileData) => {
          if (profileData.userComments.length > 25) {return true}
          return false
        }
      },
      {
        // Harsh Critic
        image: require('../../assets/badges/harsh-critic.png'),
        description: 'You rate entries low!',
        condition: (profileData) => {
          const avg: number = profileData.userRatings.reduce( (acc: number ,current) => {
           return acc += current.value / profileData.userRatings.length
          }, 0)
          if (0 < avg && avg < 2) {return true}
          return false
        }
      },
      {
        // Delighted
        image: require('../../assets/badges/easily-delighted.png'),
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
        image: require('../../assets/badges/normal-distribution.png'),
        description: 'You rate at exactly 2.5!',
        condition: (profileData) => {
          const avg: number = profileData.userRatings.reduce( (acc: number ,current) => {
           return acc += current.value / profileData.userRatings.length
          }, 0)
          if (avg == 2.5) {return true}
          return false
        }
      },
      {
      // Highly Esteemed
        image: require('../../assets/badges/highly-esteemed.png'),
        description: 'People like your entries!',
        condition: (profileData) => {
          if (avg && avg > 4 ) {return true}
          return false
        }
      },
    ])
  }, [avg])

  type BadgeType = {
    image: string
    description: string
    condition: (profileData: Profile) => boolean
  }



  return (
    <View style={[styles.mainContainer, styles.elevation]}>
      <View style={styles.mainTitleContainer}>
        <Text style={styles.mainTitleText}>RESEARCHER I.D.</Text>
      </View>

      <View style={styles.topHalfContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsNameText}>{profileData.userName}</Text>
          <Text style={styles.detailsAlienText}>Max Height: 32 ⍙</Text>
          <Text style={styles.detailsAlienText}>Timespace: 900 ⊬⋉</Text>
          <Text style={styles.detailsAlienText}>Low-Grav Authorized ⏚</Text>
        </View>

        <View style={styles.topHalfSpacer}>

        </View>

        <View>
          <Image  style={styles.faceImage} source={Images[mapNameToPic(profileData.userName) as keyof typeof Images]}></Image>
        </View>
      </View>

      <ScrollView horizontal style={styles.bottomHalfContainer}>
        {badges.map((badge, i) => {
          if (badge.condition(profileData)) {
            return <OneStamp key={i} image={badge.image} description={badge.description} />
          }
        })}
      </ScrollView>
    </View>
   )
  }

  const styles = StyleSheet.create({
    mainContainer: {
      margin: 20,
      backgroundColor: "#45417B",
      borderRadius: 5,
    },
    mainTitleContainer: {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      alignItems: "center",
      backgroundColor: colors.black
    },
    mainTitleText: {
      fontFamily: "Gruppe_A",
      fontSize: 24,
      margin: 5,
      color: "#9578F8",
    },
    topHalfContainer: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    detailsContainer: {
      fontFamily: "Gruppe_A",
      margin: 10,
      gap: 5,
    },
    topHalfSpacer:{
      flex: 1
    },
    bottomHalfContainer: {
    },
    detailsNameText: {
      fontFamily: "Gruppe_A",
      textDecorationLine: 'underline',
      fontSize: 20,
      color: 'white',
    },
    detailsAlienText: {
      fontFamily: "Gruppe_A",
      color: 'white',
    },
    faceImage: {
      height: 100,
      width: 100,
      margin: 5,
      borderColor: colors.black,
      borderWidth: 1,
    },
    elevation: {
      elevation: 13,
      shadowColor: 'white',
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  })


export {mapNameToPic}