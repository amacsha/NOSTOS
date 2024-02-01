import React from "react";
import { Button, Text, View } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from "../../store";
const EntryView: React.FC = ({navigate}: any) => {
    const id = useSelector((state: RootState) => state.entries.selctedEntryID);
    return (
        <View>
            <Text>Very cool entry here: {id}</Text>

        </View>
    )
}

export default EntryView;