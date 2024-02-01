import { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import NewEntryService from '../../service/NewEntryService';
import LogoutService from '../logout/Logout';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Entry } from '../../client-types/Entry';


const NewEntryForm: React.FC = () => {
    const [tags, setTags] = useState<string | never>('')
    const userId: number | null = useSelector(
        (state: RootState) => state.user.id
    );
    const username: string | null = useSelector(
        (state: RootState) => state.user.username
    );
    const placeId: number | null = useSelector(
        (state: RootState) => state.places.selectedPlaceId
    )

    const validationSchema = Yup.object<Entry>().shape({
        title: Yup.string().required('Choose a nice title to your story'),
        content: Yup.string().required('Tell us about your experience'),
        tag: Yup.array()
            .max(3, 'You can add 3 tags max')
    })

    const handleSubmit = async (values: Entry) => {
        values.authorId = userId
        values.placeId = 1
        console.log(values)
        await NewEntryService(values)
        values.tag = []
    }

    return (
        <View style={styles.container}>
            <Text>Create a new Entry</Text>
            <Formik<Entry>
                initialValues={{ placeId: placeId, authorId: userId, title: '', content: '', tag: [] }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    handleSubmit(values)
                        .then(() => actions.resetForm())
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
                        <TextInput
                            style={styles.input}
                            value={tags}
                            onChangeText={text => setTags(text)}
                            onBlur={handleBlur('tag')}
                            placeholder='add 3 tags'
                            placeholderTextColor='#876FE4'
                        />
                        {touched.tag && errors.tag && (
                            <Text style={styles.error}>{errors.tag}</Text>
                        )}
                        <Button title="+"
                            onPress={() => {
                                if (tags !== '') values.tag.push(tags.trim().toLowerCase())
                                setTags("")
                            }}
                        />
                        {values.tag.length > 0 && values.tag.map((oneTag, index) => {
                            return (<View key={index}>
                                <Text>{oneTag}</Text>
                                <Button title='-'
                                    onPress={() => {
                                        const newTagArray = [...values.tag];
                                        newTagArray.splice(index, 1);
                                        setFieldValue('tag', newTagArray);
                                    }}
                                />
                            </View>
                            )
                        })}
                        <Button title="Submit" onPress={() => handleSubmit()} />
                    </>
                )}
            </Formik >
            <LogoutService />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#081116',
        height: '100%',
        color: '#D4D5D6'
    },
    head: {},
    input: {
        backgroundColor: '#19222A',
        color: '#D4D5D6',
        margin: 5,
    },
    error: {
        backgroundColor: '#341717',
        color: '#DD7272',
        margin: 5,
    },
    add: {},
    delete: {}
})

export default NewEntryForm;