import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Animated, Dimensions, Easing, Alert, Button, GestureResponderEvent, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Typewriter from "../../utils/TypewriterLoading";
import { backstory } from './../../assets/backstory/bs'
import { TouchableHighlight } from "react-native";
import { colors } from "../styles/colors";


const bs = backstory

const screenHeight = Dimensions.get('window').height;


type LoginProps = {
  navigation: NativeStackNavigationProp<any>
}

const Login: React.FC<LoginProps> = ({ navigation }) => {

  const scrollY = new Animated.Value(0);

  React.useEffect(() => {
    const animation = Animated.timing(scrollY, {
      toValue: -screenHeight * 2.1, 
      duration: 40000,
      useNativeDriver: true,
      easing: Easing.linear,
    });
  
    Animated.loop(
      animation,
      {
        resetBeforeIteration: true, 
      }
    ).start();
  
  }, []);



  return (
    <SafeAreaView style={styles.container}>
     
     <View style={styles.backStoryContainer}>
     <Animated.View style={{
        transform: [{ translateY: scrollY }],
        position: 'absolute',
        top: 720,
        width: '100%',
      }}>
          <Text style={styles.backstoryText}>
            {backstory.short}
          </Text>
        </Animated.View>
      </View>
      <View style={styles.buttonContainer}>
              <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.button} underlayColor="#322F58" onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>REGISTER</Text>
              </TouchableHighlight>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGrey,
    height: '100%',
    fontFamily: 'Gruppe_A',
    borderBlockColor: colors.basePurple,
    alignItems: 'stretch',
    paddingBottom: 20,
  },
  backStoryContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.darkGrey,
    paddingBottom: 20,
  },
  backStory: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.darkGrey,
  },
  backstoryText: {
    color: colors.gunMetalGrey,
    fontSize: 40,
    marginHorizontal: 20,
    marginVertical: 25,
    fontFamily: 'Gruppe_A',
    lineHeight: 50,
  },  
  buttonContainer: {
    flex: 1,
    position: 'absolute', 
    bottom: 0, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%', 
    paddingBottom: 40,
    backgroundColor: colors.basePurple, 
  },
  button: {
    backgroundColor: colors.basePurple,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    margin: 5,
    padding: 5,
    height: 40,
    fontFamily: 'Gruppe_A',
  },
  buttonText: {
    color: colors.gunMetalGrey,
    fontSize: 20,
    fontFamily: 'Gruppe_A',
  },
})

export default Login;