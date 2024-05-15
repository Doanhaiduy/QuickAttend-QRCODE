import { authSelector } from '@/redux/reducers/authReducer';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function AuthLayout() {
    const auth = useSelector(authSelector);

    if (auth.accessToken) {
        return <Redirect href={'/'} />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='login' />
            <Stack.Screen name='signup' />
            <Stack.Screen name='forgot' />
            <Stack.Screen name='verification' />
            <Stack.Screen name='newPassword' />
        </Stack>
    );
}

const styles = StyleSheet.create({});
