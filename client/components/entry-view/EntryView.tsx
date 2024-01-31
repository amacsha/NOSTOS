import React, { useEffect, useState } from "react";
import { Button, Text, View, ActivityIndicator, TouchableHighlight } from "react-native";
import {getOneEntry} from "./EntryService";

import UserRating from "./UserRating";

const EntryView: React.FC = ({navigate}: any) => {
    const [entryDetails, setEntryDetails] = useState<any>(undefined)

    const [userId] = useState<number>(85)
    const [entryId] = useState<number>(1)

    async function load() {
        const update = await getOneEntry(entryId);
        setEntryDetails(update)
    }

    useEffect(() => {load()}, []);
    if (!entryDetails) return <ActivityIndicator />

    return (
        <>
        <View>
            <Text>{entryDetails.data.title}</Text>
        </View>

        <View>
            <Text>{entryDetails.data.content}</Text>
            <UserRating userId={userId} entryId={entryId}/>
        </View>
        </>
    )
}

export default EntryView;
