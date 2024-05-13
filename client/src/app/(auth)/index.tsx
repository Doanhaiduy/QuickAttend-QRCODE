import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function LoginPage() {
    return (
        <View className='flex-1 justify-center items-center font-inter'>
            <Text className='font-inter'>Login Page</Text>
            <Link href={'/register'}>Register</Link>
            <Link href={'/(tabs)'}>Tabs</Link>
        </View>
    );
}

const styles = StyleSheet.create({});
