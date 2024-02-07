import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import moment from "moment";
import Typewriter from "../../utils/TypewriterLoading";
import { colors } from "../styles/colors";
import Images from "../../assets/aliens/picIndexes";
import { mapNameToPic } from "../Profile/IDCard";

type CommentProps = {
  content: string;
  userName: string;
  date: Date;
};

export default function OneComment({ content, userName, date }: CommentProps) {
  if (content != undefined && userName  != undefined) {
    const titleString: string = `${userName}, ${moment(date).fromNow()}:`;
    const contentWithQuotes = `"${content}"`;
    return (
      // <>
      //   <Text style={styles.userName}>
      //     <Typewriter text={titleString} delay={5} />
      //   </Text>

      //   <Text style={styles.content}>
      //     <Typewriter text={contentWithQuotes} delay={5} />
      //   </Text>
      // </>
      <>
        <Text style={styles.outsideText}>{userName}:</Text>
        <View style={styles.container}>
          
        <View>
          <Image style={styles.faceImage} source={Images[mapNameToPic(userName) as keyof typeof Images]}></Image>
        </View>
          
        <View>
          <View style={styles.messageBuble}>
            <Text style={styles.content}>
              <Typewriter text={content} delay={5} />
            </Text>
          </View>
          <Text style={styles.outsideText}>{moment(date).fromNow()}</Text>  
        </View>
          
        </View>
      </>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: 'row',
  },
  outsideText: {
    paddingLeft: 10,
    fontSize: 13,
    fontFamily: "Gruppe_A",
    color: 'white',
  },
  content: {
    fontSize: 15,
    fontFamily: "Gruppe_A",
    color: colors.black,
  },
  messageBuble: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 10,
    textAlign: 'left',
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    minWidth: 100,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'black'
  },
  faceImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black'
  },
});
