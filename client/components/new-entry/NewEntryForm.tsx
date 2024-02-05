import React from 'react';
import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
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
                                style={styles.input}
                                value={values.content}
                                onChangeText={handleChange('content')}
                                onBlur={handleBlur('content')}
                                placeholder='what do you see? what do you smell? what do you feel?'
                                placeholderTextColor={colors.lighterPurple}
                            />
                            {touched.content && errors.content && (
                                <Text style={styles.error}>{errors.content}</Text>
                            )}
                            <View style={styles.tag}>
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
                                <Pressable style={[styles.button, styles.add]}
                                    onPress={() => {
                                        if (tags !== '') values.tag.push(tags.trim().toLowerCase())
                                        setTags("")
                                    }}
                                >
                                    <Text style={styles.buttonText}>+</Text>
                                </Pressable>
                            </View>
                            {values.tag.length > 0 && values.tag.map((oneTag, index) => {
                                return (
                                    <View style={styles.tag} key={index}>
                                        <Text style={styles.tagText}>{oneTag}</Text>
                                        <Pressable style={[styles.button, styles.delete]}
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
                            <Pressable style={styles.button} onPress={() => handleSubmit()} >
                                <Text style={styles.buttonText}>Submit</Text>
                            </Pressable>
                        </>
                    )}
                </Formik >
            </View>
            <Logout />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.darkGre7,
        height: '100%',
        fontFamily: 'Gruppe_A',
    },
    head: {
        fontSize: 20,
        color: colors.gunMetalGrey,
        fontFamily: 'Gruppe_A',
        marginHorizontal: 25,
    },
    inputArea: {
        marginTop: 100
    },
    input: {
        backgroundColor: colors.gunMetalGrey,
        color: colors.darkGre7,
        marginVertical: 5,
        marginHorizontal: 25,
        paddingLeft: 5,
        height: 50,
        fontSize: 20,
        fontFamily: 'Gruppe_A',
    },
    error: {
        backgroundColor: colors.errorBackground,
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
    button: {
        backgroundColor: colors.basePurple,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        margin: 5,
        padding: 5,
        height: 40,
        width: 130,
        fontFamily: 'Gruppe_A',
    },
    buttonText: {
        color: colors.gunMetalGrey,
        fontSize: 20,
        fontFamily: 'Gruppe_A',
    },
    tag: {
        backgroundColor: colors.gunMetalGrey,
        fontFamily: 'Gruppe_A',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30,
        width: 120,
        marginVertical: 5,
        marginHorizontal: 25,
        borderRadius: 25,
        padding: 0
    },
    add: {
        fontFamily: 'Gruppe_A',
        height: 30,
        width: 30,
        borderRadius: 25,
        // marginVertical: 5,
        // marginHorizontal: 25,
    },
    delete: {
        fontFamily: 'Gruppe_A',
        height: 30,
        width: 30,
        borderRadius: 25,
    },
    tagInput: {
        fontFamily: 'Gruppe_A',
        backgroundColor: colors.gunMetalGrey,
        paddingLeft: 5,
        borderRadius: 25

    },
    tagText: {
        fontFamily: 'Gruppe_A',
        backgroundColor: colors.gunMetalGrey,
        paddingLeft: 5,
        borderRadius: 25,
    }
})

export default NewEntryForm;