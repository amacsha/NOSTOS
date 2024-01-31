import { Text, Button } from "react-native";


export default function Main({navigation}: any) {

    return (
        <>
        <Button title="hiya" onPress={() => navigation.navigate('Login')}/>
        <Text>Wassah</Text>
        </>
    )
}