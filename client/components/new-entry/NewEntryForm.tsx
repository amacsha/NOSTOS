import React from 'react';
import { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import NewEntryService from '../../service/NewEntryService';
import Logout from '../logout/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Entry } from '../../client-types/Entry';
import { selectEntry } from '../../slices/entriesSlice';
import { getValueFor } from '../../utils/secureStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { wrap } from 'module';



const NewEntryForm: React.FC = ({ navigation }: any) => {
    const [tags, setTags] = useState<string | never>('')
    const dispatch = useDispatch()

    const userId: number | null = useSelector(
        (state: RootState) => state.user.id
    );
    const placeId: string | null = useSelector(
        (state: RootState) => state.places.selectedPlaceId
    )

    const token: string = getValueFor("accessToken") || "";


    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Choose a nice title to your story'),
        content: Yup.string().required('Tell us about your experience'),
        tag: Yup.array()
            .max(3, 'You can add 3 tags max')
    })

    const userIdState = useSelector(
        (state: RootState) => state.user.id
    );

    const handleSubmit = async (values: Entry) => {
        values.authorId = userId
        values.placeId = placeId
        const res = await NewEntryService(values, token)
        dispatch(selectEntry(res.data.id))
        values.tag = []
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.inputArea}>

                        <Text style={styles.head}>Create a new Entry</Text>
                        <Formik<Entry>
                            initialValues={{ placeId: placeId, authorId: userId, title: '', content: '', tag: [] }}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => {
                                handleSubmit(values)
                                actions.resetForm()
                                actions.setFieldValue('tag', [])
                                setTags('')
                                navigation.navigate('Location' as never)
                            }}
                        >
                            {({ handleChange, handleSubmit, handleBlur, setFieldValue, values, touched, errors }) => (
                                <>
                                            <View style={styles.tag}>
                                                {values.tag.length > 0 && values.tag.map((oneTag, index) => {
                                                    return (
                                                        <View style={styles.oneTag} key={index}>
                                                            <Text style={styles.tagText}>{oneTag}</Text>
                                                            <Pressable style={styles.delete}
                                                                onPress={() => {
                                                                    const newTagArray = [...values.tag];
                                                                    newTagArray.splice(index, 1);
                                                                    setFieldValue('tag', newTagArray);
                                                                }}
                                                            >
                                                                <Text style={styles.buttonText} >-</Text>
                                                            </Pressable>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                    <TextInput
                                        style={styles.input}
                                        value={values.title}
                                        onChangeText={handleChange('title')}
                                        onBlur={handleBlur('title')}
                                        placeholder='title'
                                        placeholderTextColor={colors.lighterPurple}
                                    />
                                    {touched.title && errors.title && (
                                        <Text style={styles.error}>{errors.title}</Text>
                                    )}
                                    <TextInput
                                        style={[styles.input, styles.content]}
                                        multiline
                                        value={values.content}
                                        onChangeText={handleChange('content')}
                                        onBlur={handleBlur('content')}
                                        placeholder='what do you see? what do you smell? what do you feel?'
                                        placeholderTextColor={colors.lighterPurple}
                                    />
                                    {touched.content && errors.content && (
                                        <Text style={styles.error}>{errors.content}</Text>
                                    )}
                                    <View style={styles.bottom}>
                                        <View style={styles.tag}>
                                            <View style={styles.oneTag}>
                                                <TextInput
                                                    style={styles.tagInput}
                                                    value={tags}
                                                    onChangeText={text => setTags(text)}
                                                    onBlur={handleBlur('tag')}
                                                    placeholder='add 3 tags'
                                                    placeholderTextColor={colors.lighterPurple}
                                                />
                                                {touched.tag && errors.tag && (
                                                    <Text style={styles.error}>{errors.tag}</Text>
                                                )}
                                                <Pressable style={styles.add}
                                                    onPress={() => {
                                                        if (tags !== '') values.tag.push(tags.trim().toLowerCase())
                                                        setTags("")
                                                    }}
                                                >
                                                    <Text style={styles.buttonText}>+</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                        <Pressable style={styles.submitButton} onPress={() => handleSubmit()} >
                                            <Text style={styles.buttonText}>Submit</Text>
                                        </Pressable>
                                    </View>
                                </>
                            )}
                        </Formik >
                    </View>
                </SafeAreaView >
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lighterPurple,
        height: '100%',
        fontFamily: 'Gruppe_A',
        flex: 1,
    },
    head: {
        padding: 10,
        fontSize: 25,
        marginLeft: 15,
        color: colors.darkGrey,
        fontFamily: "Gruppe_A",
        textShadowColor: 'rgba(255, 255, 255, 0.75)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    inputArea: {
        marginTop: '10%',
        flex: 1,
    },
    input: {
        backgroundColor: colors.darkGrey,
        color: colors.black,
        marginVertical: 5,
        marginHorizontal: 25,
        height: 30,
        fontSize: 20,
        fontFamily: 'Gruppe_A',
    },
    content: {
        height: '70%',
    },
    error: {
        // backgroundColor: colors.errorBackground,
        color: colors.errorFont,
        marginVertical: 2,
        marginHorizontal: 25,
        paddingTop: 5,
        paddingLeft: 5,
        height: 25,
        fontSize: 15,
        fontFamily: 'Gruppe_A',
        justifyContent: 'center'
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 40,
        marginTop: 10,
    },
    tag: {
        backgroundColor: colors.basePurple,
        fontFamily: 'Gruppe_A',
        justifyContent: 'space-between',
        height: 30,
        width: 120,
        marginVertical: 5,
    },
    oneTag: {
        flexDirection: 'row',
    },
    submitButton: {
        borderColor: colors.darkGrey,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 5,
        padding: 5,
        height: 40,
        width: 130,
        fontFamily: 'Gruppe_A',
    },
    buttonText: {
        color: colors.darkGrey,
        fontSize: 20,
        fontFamily: 'Gruppe_A',
    },
    add: {
        fontFamily: 'Gruppe_A',
        borderColor: colors.darkGrey,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 35,
        borderWidth: 1,
        borderRadius: 25,
        // marginVertical: 5,
        // marginHorizontal: 25,
    },
    delete: {
        fontFamily: 'Gruppe_A',
        borderColor: colors.darkGrey,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 35,
        borderWidth: 1,
        borderRadius: 25,
    },
    tagInput: {
        fontFamily: 'Gruppe_A',
        fontSize: 15,
        color: colors.darkGrey,
        padding: 10,
        borderRadius: 25
    },
    tagText: {
        fontFamily: 'Gruppe_A',
        fontSize: 15,
        color: colors.black,
        padding: 10,
        borderRadius: 25
    }
})

export default NewEntryForm;