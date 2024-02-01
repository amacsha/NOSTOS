import React, { useEffect, useState } from "react";
import { Button, Text, View, ActivityIndicator, TouchableHighlight, StyleSheet } from "react-native";
import { getOneEntry, getComments } from "./EntryService";

import UserRating from "./UserRating";
import CommentView from "./CommentView";

const EntryView: React.FC = ({ navigate }: any) => {
    const [entryDetails, setEntryDetails] = useState<any>(undefined)

    const [userId] = useState<number>(85)
    const [entryId] = useState<number>(1)
    const [comments, setComments] = useState<any>([])

    async function load() {
        const update = await getOneEntry(entryId);
        const comments = await getComments(entryId)
        setComments(comments)
        setEntryDetails(update)
    }

    useEffect(() => { load() }, []);
    if (!entryDetails) return <ActivityIndicator />

    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{entryDetails.data.title}</Text>
                </View>

                <View>
                    <Text style={styles.content}>{entryDetails.data.content}</Text>
                </View>

                <View style={styles.ratings}>
                    <UserRating userId={userId} entryId={entryId} />
                </View>
            </View>
            <View>

                <CommentView comments={comments} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        margin: 5
    },
    title: {
        fontWeight: "bold",
        fontSize: 28,
        margin: 15
    },
    content: {
        fontSize: 18,
        margin: 35

    },
    ratings: {

    }
})

export default EntryView;
