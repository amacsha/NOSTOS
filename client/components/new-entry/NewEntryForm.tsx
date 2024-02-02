import React from 'react';
import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import NewEntryService from '../../service/NewEntryService';
import Logout from '../logout/Logout';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Entry } from '../../client-types/Entry';
import { useNavigation } from '@react-navigation/native';

const NewEntryForm: React.FC = () => {
    const [tags, setTags] = useState<string | never>('')
    const userId: number | null = useSelector(
        (state: RootState) => state.user.id
    );
    const username: string | null = useSelector(
        (state: RootState) => state.user.username
    );
    const placeId: string | null = useSelector(
        (state: RootState) => state.places.selectedPlaceId
    )
    const navigation = useNavigation()


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
        if (userIdState) {
            values.authorId = userId
            values.placeId = 'ChIJ0-48HywBdkgRh7MH0Igd1f4'
            const res = await NewEntryService(values)
        }
    }
    
    return (
        <View style={styles.container}>
            <Text>Create a new Entry</Text>
            <Formik<Entry>
                initialValues={{ placeId: placeId, authorId: userId, title: '', content: '', tag: [] }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    handleSubmit(values)
                    actions.resetForm()
                    actions.setFieldValue('tag', [])
                    setTags('')
                    navigation.navigate('Main' as never)

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
                            placeholderTextColor='#876FE4'
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
                            placeholderTextColor='#876FE4'
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
                                placeholderTextColor='#876FE4'
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
            <Logout />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#081116',
        height: '100%',
        color: '#D4D5D6',
        padding: 10,
        fontFamily: 'Gruppe_A', 
    },
    head: {},
    input: {
        backgroundColor: '#19222A',
        color: '#D4D5D6',
        marginVertical: 2,
        height: 30,
        fontSize: 17,
        paddingLeft: 10,
        fontFamily: 'Gruppe_A', 
    },
    error: {
        backgroundColor: '#341717',
        color: '#DD7272',
        marginVertical: 2,
        marginHorizontal: 10,
        height: 30,
        fontSize: 17,
        fontFamily: 'Gruppe_A', 
    },
    button: {
        backgroundColor: '#45417B',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 3,
        padding: 3,
        height: 30,
        width: 80,
        fontFamily: 'Gruppe_A', 
    },
    buttonText: {
        color: '#9578F8',
        fontSize: 17,
        fontFamily: 'Gruppe_A', 
    },
    tag: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 25,
        width: 80,
        height: 30,
        backgroundColor: '#19222A',
        margin: 2,
        fontFamily: 'Gruppe_A', 

    },
    add: {
        height: 30,
        width: 30,
        padding: 0,
        fontFamily: 'Gruppe_A', 

    },
    delete: {
        height: 30,
        width: 30,
        borderRadius: 25,
        padding: 0,
        fontFamily: 'Gruppe_A', 
    },
    tagInput: {
        paddingLeft: 10,
        paddingRight: 0,
        marginRight: 0,
        width: 200,
        backgroundColor: '#19222A',
        fontFamily: 'Gruppe_A', 

    },
    tagText: {
        paddingLeft: 10,
        color: '#9578F8',
        height: 30,
        width: 30,
        marginTop: 6,
        textAlign: 'center',
        fontFamily: 'Gruppe_A', 
    }
})

export default NewEntryForm;