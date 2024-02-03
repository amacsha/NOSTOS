import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
const Typewriter = ({ text, delay }: { text: string, delay: number }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    //const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // const rnd = () => {
    //   return Math.floor(Math.random() * chars.length - 1)
    // }
    const genChars = (x: number) => {
        const chars = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅗㅛㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅗㅛㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅗㅛ"
        let res: string = "";
        for (let i = 0; i < x; i++) {
            res += chars[Math.floor(Math.random() * chars.length)]
        }
        return res;
    }
    // Typing logic goes here
    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(text.slice(0, currentIndex) + genChars(2));
                setCurrentIndex(prevIndex => prevIndex + 1);
                if (currentIndex === text.length - 1) setCurrentText(text);
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);
    return <Text style={styles.content}>{currentText}</Text>
};
const styles = StyleSheet.create({
    content: {
        minHeight: 350,
        fontSize: 60,
        lineHeight: 124,
        margin: 35,
        fontFamily: 'Gruppe_A',
    }
})
export default Typewriter;
// BASE CODE FROM https://blog.logrocket.com/3-ways-implement-typing-animation-react/